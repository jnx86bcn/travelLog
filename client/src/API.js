export async function  listLogEntries() {
    const response = await fetch(`http://localhost:1337/api/logs`);
    return response.json();
}

export async function  createLogEntry(entry) {
    const apiKey = entry.ApiKey;
    delete entry.apiKey;
    const response = await fetch(`http://localhost:1337/api/logs`,{
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-API-KEY':apiKey
        },
        body: JSON.stringify(entry),
    });
    if(response.ok) {
        return await response.json();
    }
    throw new Error(response.statusText);
}