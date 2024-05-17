import inquirer from 'inquirer';
import chalk from 'chalk';

async function promptTimeInput() 
    {
        const Time = await inquirer.prompt([
            {
                type: "number",
                name: "hrs",
                message: "\nEnter Hours: "
            },
            {
                type: "number",
                name: "min",
                message: "\nEnter Minutes: "
            },
            {
                type: "number",
                name: "sec",
                message: "\nEnter Seconds: "
            }
        ]);

        return Time;
    }

// Function to format date and time as YYYY-MM-DD HH:MM:SS
function formatDateTime(date:any) 
    {
        const year = date.getFullYear();
        const month = `0${date.getMonth() + 1}`.slice(-2);
        const day = `0${date.getDate()}`.slice(-2);
        const hours = `0${date.getHours()}`.slice(-2);
        const minutes = `0${date.getMinutes()}`.slice(-2);
        const seconds = `0${date.getSeconds()}`.slice(-2);
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

// Function to calculate target timestamp and start countdown timer
async function startCountdown() 
    {
        
        
        const Time = await promptTimeInput();
        const hrsToAdd = Time.hrs || 0;
        const minToAdd = Time.min || 0;
        const secToAdd = Time.sec || 0;
        const totalSecondsToAdd = (hrsToAdd * 3600) + (minToAdd * 60) + secToAdd;
        const currentDate = new Date();
        const currentTimestamp = Math.floor(currentDate.getTime() / 1000); 
        const targetTimestamp = currentTimestamp + totalSecondsToAdd;

        

        const targetDate = new Date(targetTimestamp * 1000); 
        const targetDateTime = formatDateTime(targetDate);
        const currentDateTime = formatDateTime(currentDate);
        console.log(chalk.bgBlue.white.bold(`Current Time: ${currentDateTime}`));
        console.log(chalk.bgRed.white.bold(`Target Time: ${targetDateTime}`));

        // Countdown timer
        const interval = setInterval(() => {
            const currentTimestampSeconds = Math.floor(new Date().getTime() / 1000);
            const secondsRemaining = targetTimestamp - currentTimestampSeconds;

            if (secondsRemaining > 0) {
                console.log(chalk.greenBright(`Time remaining: ${secondsRemaining} seconds`));
            } else {
                console.log(chalk.bgRed.white.bold("\n\nAlarm!\n\n"));
                clearInterval(interval); // Stop the countdown timer
            }
        }, 1000); 
    }


startCountdown();