require('dotenv').config();
const { google } = require('googleapis');

// สร้าง auth credentials จาก environment variables
const auth = new google.auth.GoogleAuth({
    credentials: {
        type: 'service_account',
        project_id: process.env.GOOGLE_CLOUD_PROJECT_ID,
        private_key_id: process.env.GOOGLE_CLOUD_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY,
        client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLOUD_CLIENT_ID,
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: process.env.GOOGLE_CLOUD_CLIENT_X509_CERT_URL,
        universe_domain: "googleapis.com"
    },
    scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/drive.appdata',
        'https://www.googleapis.com/auth/drive.apps.readonly'
    ],
});

async function listFolders(parentFolderId = 'root') {
    const drive = google.drive({ version: 'v3', auth });
    try {
        const res = await drive.files.list({
            q: `mimeType='application/vnd.google-apps.folder' and '${parentFolderId}' in parents and trashed=false`,
            fields: 'nextPageToken, files(id, name, createdTime, modifiedTime, webViewLink)',
            orderBy: 'name',
        });

        const folders = res.data.files;
        if (folders.length) {
            console.log('\nFolders found:');
            console.log('----------------------------------------');
            folders.forEach((folder) => {
                console.log(`Name: ${folder.name}`);
                console.log(`ID: ${folder.id}`);
                console.log(`Created: ${new Date(folder.createdTime).toLocaleString()}`);
                console.log(`Modified: ${new Date(folder.modifiedTime).toLocaleString()}`);
                console.log('----------------------------------------');
            });
        } else {
            console.log('No folders found.');
        }

        return folders;
    } catch (err) {
        console.error('Error listing folders:', err);
        throw err;
    }
}

async function listFilesInFolder(folderId) {
    const drive = google.drive({ version: 'v3', auth });
    try {
        const res = await drive.files.list({
            q: `'${folderId}' in parents and trashed=false`,
            fields: 'nextPageToken, files(id, name, mimeType, size, createdTime, modifiedTime, webViewLink)',
            orderBy: 'name',
        });

        const files = res.data.files;
        if (files.length) {
            console.log(`\nFiles in folder ${folderId}:`);
            console.log('----------------------------------------');
            files.forEach((file) => {
                console.log(`Name: ${file.name}`);
                console.log(`ID: ${file.id}`);
                console.log(`Type: ${file.mimeType}`);
                console.log(`Size: ${formatFileSize(file.size)}`);
                console.log(`Created: ${new Date(file.createdTime).toLocaleString()}`);
                console.log(`Modified: ${new Date(file.modifiedTime).toLocaleString()}`);
                console.log('----------------------------------------');
            });
        } else {
            console.log('No files found in folder.');
        }

        return files;
    } catch (err) {
        console.error('Error listing files:', err);
        throw err;
    }
}

// Utility function to format file size
function formatFileSize(bytes) {
    if (!bytes) return 'N/A';
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

// ฟังก์ชันสำหรับลบโฟลเดอร์และไฟล์ทั้งหมดในนั้น
async function deleteFolder(folderId) {
    const drive = google.drive({ version: 'v3', auth });
    try {
        // ตรวจสอบว่าโฟลเดอร์มีอยู่จริง
        const folder = await drive.files.get({
            fileId: folderId,
            fields: 'name, mimeType'
        });

        if (folder.data.mimeType !== 'application/vnd.google-apps.folder') {
            throw new Error('Specified ID is not a folder');
        }

        console.log(`\nDeleting folder: ${folder.data.name}`);

        // ดึงรายการไฟล์และโฟลเดอร์ย่อยทั้งหมด
        const res = await drive.files.list({
            q: `'${folderId}' in parents and trashed=false`,
            fields: 'files(id, name, mimeType)',
        });

        // ลบไฟล์และโฟลเดอร์ย่อยทั้งหมด
        if (res.data.files.length > 0) {
            console.log('\nDeleting contents:');
            for (const file of res.data.files) {
                if (file.mimeType === 'application/vnd.google-apps.folder') {
                    // ถ้าเป็นโฟลเดอร์ให้ลบแบบ recursive
                    await deleteFolder(file.id);
                } else {
                    // ลบไฟล์
                    await drive.files.delete({ fileId: file.id });
                    console.log(`Deleted file: ${file.name}`);
                }
            }
        }

        // ลบโฟลเดอร์หลัก
        await drive.files.delete({ fileId: folderId });
        console.log(`\nSuccessfully deleted folder: ${folder.data.name}`);
        return true;

    } catch (err) {
        if (err.code === 404) {
            console.error('Folder not found');
        } else {
            console.error('Error deleting folder:', err);
        }
        throw err;
    }
}

// ฟังก์ชันสำหรับยืนยันการลบ
function confirmDeletion(folderName) {
    return new Promise((resolve) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question(`Are you sure you want to delete folder "${folderName}" and all its contents? (yes/no): `, (answer) => {
            readline.close();
            resolve(answer.toLowerCase() === 'yes');
        });
    });
}

// ฟังก์ชันสำหรับลบทุกโฟลเดอร์
async function deleteAllFolders() {
    const drive = google.drive({ version: 'v3', auth });
    try {
        console.log('\nFetching all folders...');
        
        // ดึงรายการโฟลเดอร์ทั้งหมด
        const res = await drive.files.list({
            q: "mimeType='application/vnd.google-apps.folder' and trashed=false",
            fields: 'files(id, name)',
            orderBy: 'createdTime'
        });

        const folders = res.data.files;
        
        if (folders.length === 0) {
            console.log('No folders found to delete.');
            return;
        }

        console.log(`\nFound ${folders.length} folders to delete:`);
        folders.forEach(folder => {
            console.log(`- ${folder.name} (${folder.id})`);
        });

        // ยืนยันการลบ
        const confirmed = await confirmBulkDeletion(folders.length);
        if (!confirmed) {
            console.log('Bulk deletion cancelled.');
            return;
        }

        console.log('\nStarting bulk deletion...');
        console.log('----------------------------------------');

        // ลบทีละโฟลเดอร์
        let successCount = 0;
        let failCount = 0;

        for (const folder of folders) {
            try {
                await deleteFolder(folder.id);
                successCount++;
                console.log(`Progress: ${successCount}/${folders.length} folders deleted`);
            } catch (err) {
                failCount++;
                console.error(`Failed to delete folder ${folder.name}:`, err.message);
            }
        }

        console.log('\nDeletion Summary:');
        console.log('----------------------------------------');
        console.log(`Total folders: ${folders.length}`);
        console.log(`Successfully deleted: ${successCount}`);
        console.log(`Failed to delete: ${failCount}`);
        console.log('----------------------------------------');

    } catch (err) {
        console.error('Error in bulk deletion:', err);
        throw err;
    }
}

// ฟังก์ชันยืนยันการลบจำนวนมาก
function confirmBulkDeletion(count) {
    return new Promise((resolve) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        console.log('\nWARNING: This action will permanently delete all folders and their contents!');
        console.log('This action cannot be undone.');
        readline.question(`Are you absolutely sure you want to delete all ${count} folders? (type 'DELETE ALL' to confirm): `, (answer) => {
            readline.close();
            resolve(answer === 'DELETE ALL');
        });
    });
}

// ปรับปรุง main function
async function main() {
    try {
        console.log('1. List folders');
        console.log('2. Delete specific folder');
        console.log('3. Delete ALL folders');
        
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question('Choose an option (1, 2 or 3): ', async (option) => {
            try {
                switch(option) {
                    case '1':
                        const folders = await listFolders();
                        if (folders.length > 0) {
                            readline.question('\nEnter folder ID to see contents (or press Enter to exit): ', async (folderId) => {
                                if (folderId) {
                                    await listFilesInFolder(folderId);
                                }
                                readline.close();
                            });
                        } else {
                            readline.close();
                        }
                        break;

                    case '2':
                        const foldersToDelete = await listFolders();
                        if (foldersToDelete.length > 0) {
                            readline.question('\nEnter folder ID to delete: ', async (folderId) => {
                                try {
                                    const folder = await drive.files.get({
                                        fileId: folderId,
                                        fields: 'name'
                                    });
                                    
                                    const confirmed = await confirmDeletion(folder.data.name);
                                    if (confirmed) {
                                        await deleteFolder(folderId);
                                        console.log('Deletion completed successfully');
                                    } else {
                                        console.log('Deletion cancelled');
                                    }
                                } catch (err) {
                                    console.error('Error:', err.message);
                                } finally {
                                    readline.close();
                                }
                            });
                        } else {
                            console.log('No folders to delete');
                            readline.close();
                        }
                        break;

                    case '3':
                        await deleteAllFolders();
                        break;

                    default:
                        console.log('Invalid option');
                }
            } catch (err) {
                console.error('Error:', err.message);
            } finally {
                readline.close();
            }
        });

    } catch (err) {
        console.error('Error in main execution:', err);
        process.exit(1);
    }
}

// Run the script
main(); 