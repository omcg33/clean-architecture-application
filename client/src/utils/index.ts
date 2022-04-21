import fs from "fs";

export interface IAsset {
    file: string;
    hash: string;
    publicPath: string;
}
export interface IConvertCssAssetsToCriticalCssStringOptions {
    publicPath: string;
    fileSystemPath: string;
}

export const cleanDublicationSlashInPath = (url: string): string => url.replace(/\/\//g, "/");

export const convertCssAssetsToString = (styles: IAsset[], prefix: string): string => {
    return styles
        .map(style => `<link rel="preload" href="${cleanDublicationSlashInPath(`${prefix}/${style.file}`)}" as="style" onload="this.onload=null;this.rel='stylesheet'" media="all">`)
        .join('\n');
}

export const convertCssAssetsToCriticalCssString = (styles: IAsset[], options: IConvertCssAssetsToCriticalCssStringOptions): string => {
    const { publicPath, fileSystemPath } = options;
    
    return styles
        .map(style => {
            let fileContent = '';

            try {
                fileContent = fs.readFileSync(cleanDublicationSlashInPath(`${fileSystemPath}/${style.file.split('?')[0]}`), "utf-8");
            } catch (e) {
                console.log(e)
            }
            
            return `<style data-href="${cleanDublicationSlashInPath(`${publicPath}/${style.file}`)}" nonce="${style.hash}">${fileContent}</style>`
        })
        .join('\n')
}

export const convertJsAssetsToString = (scripts: IAsset[], prefix: string): string => {
    return scripts
            .sort((a, b) => {
                if (a.file.includes("index")) return 1;
                if (b.file.includes("index")) return -1;
                return 0;
            })
            .map(script => `<script defer src="${cleanDublicationSlashInPath(`${prefix}/${script.file}`)}"></script>`)
            .join("\n");
}

