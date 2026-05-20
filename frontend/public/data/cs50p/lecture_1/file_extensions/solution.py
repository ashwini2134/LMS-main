def main():
    filename = input('enter your file name :').strip().lower()
    types = {
        '.gif': 'image/gif',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.pdf': 'application/pdf',
        '.txt': 'text/plain',
        '.zip': 'application/zip'
    }
    for ext, mine in types.items():
        if filename.endswith(ext):
            print(mine)
            return
            
    print('application/octet-stream')

main()
