export async function  listLogEntries() {
    const response = await fetch(`http://localhost:1337/api/logs`);
    return response.json();
}

export async function  createLogEntry(entry) {
    const response = await fetch(`http://localhost:1337/api/logs`,{
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(entry),
    });
    return response.json();
}