import Button from '../Button/Button';

function FileUpload({
    file,
    onChange,
    onUpload,
    loading = false,
}) {
    return (
        <div>
            <input
                type="file"
                accept=".csv"
                onChange={onChange}
                disabled={loading}
            />

            {file && <p>Selected file: {file.name}</p>}

            <Button
                type="button"
                onClick={onUpload}
                disabled={!file || loading}
            >
                {loading ? 'Uploading...' : 'Upload CSV'}
            </Button>
        </div>
    );
}

export default FileUpload;