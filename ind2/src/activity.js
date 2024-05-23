/**
 * Fetches a random activity from the Bored API.
 * @returns The data or an error message.
 */
export async function getRandomActivity() {
    try {
        // call mock
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/' + Math.floor(Math.random() * (200 - 1 + 1) + 1));
        console.log('https://jsonplaceholder.typicode.com/todos/' + Math.floor(Math.random() * (200 - 1 + 1) + 1))
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return JSON.stringify(data, null, 4);
    } catch (error) {
        console.error('Error fetching activity:', error);
        return "К сожалению, произошла ошибка";
    }
}
