const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:1337' : 'https://travel-log-api-jnx86bcn.now.sh'

export async function  listLogEntries() {
    const response = await fetch(`${API_URL}/api/logs`);
    return response.json();
}

export async function  createLogEntry(entry) {
    const apiKey = entry.ApiKey;
    delete entry.apiKey;
    const response = await fetch(`${API_URL}/api/logs`,{
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