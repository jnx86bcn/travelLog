export async function  listLogEntries() {
    console.log(process.env.PUBLIC_URL)
    const response = await fetch(`http://localhost:1337/api/logs`);
    return response.json();
}