const fs = require('fs');
const path = require('path');

function getSnippetFolderLocationOnWSL() {
    const mntFolderPath = '/mnt'; // /mnt folder's path
    const letters = 'abcdefghijklmnopqrstuvwxyz1234567890'; // letter array
    const targetPath = '/AppData/Roaming/Code/User/snippets/'; // search path

    for (const letter of letters) {
        const userFolderPath = path.join(mntFolderPath, letter, 'Users');

        if (fs.existsSync(userFolderPath)) {
            const defaultFolderPath = path.join(userFolderPath, 'Default');

            if (fs.existsSync(defaultFolderPath)) {
                const parentFolderPath = path.dirname(defaultFolderPath);

                // find "Default" folder's path
                const parentSubfolders = fs.readdirSync(parentFolderPath).map(subfolder => path.join(parentFolderPath, subfolder));

                for (const subfolder of parentSubfolders) {
                    const snippetsFolderPath = path.join(subfolder, targetPath);
                    if (fs.existsSync(snippetsFolderPath)) {
                        return snippetsFolderPath;
                    }
                }
            }
        }
    }

    return false;
}

module.exports = getSnippetFolderLocationOnWSL();