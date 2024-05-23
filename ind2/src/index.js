import {getRandomActivity} from './activity.js';

/**
 * Updates the activity displayed on the page.
 */
async function updateActivity() {
    const activity = await getRandomActivity();
    document.getElementById('activity').innerText = activity;
}

// Initial call
updateActivity();

// Update activity every minute
setInterval(updateActivity, 3000);
