import fs from 'fs';
import path from 'path';

// Function to write/replace content in a file
export const writeToFile = (message: string) => {
  const logFilePath = path.join(process.cwd(), 'log.txt');
  
  fs.writeFile(logFilePath, message, (err) => {
    if (err) {
      console.error('Error writing to file', err);
    } else {
      console.log('Message written to log.txt (replaced existing content)');
    }
  });
};

// Function to read content from the log.txt file
export const readFromFile = () => {
  const logFilePath = path.join(process.cwd(), 'log.txt');
  
  return new Promise((resolve, reject) => {
    fs.readFile(logFilePath, 'utf8', (err, data) => {
      if (err) {
        reject('Error reading file: ' + err);
      } else {
        resolve(data);
      }
    });
  });
};

// Function to read content from the log.txt file and simulate an Axios-like response
// Function to read content from log.txt and simulate an Axios-like response
export const simulateAxiosResponseForCheerio = () => {
    const logFilePath = path.join(process.cwd(), 'log.txt');
    
    return new Promise((resolve, reject) => {
      fs.readFile(logFilePath, 'utf8', (err, data) => {
        if (err) {
          // Simulate an error response
          reject({
            data: null,
            status: 500,
            statusText: 'Internal Server Error',
            headers: {},
            config: {},
          });
        } else {
          // Simulate a successful AxiosResponse with an HTML wrapper
          const htmlContent = `<html><body><div>${data}</div></body></html>`;
          resolve({
            data: htmlContent,        // Wrap log content in HTML for Cheerio compatibility
            status: 200,              // Success status
            statusText: 'OK',
            headers: {},
            config: {},
          });
        }
      });
    });
  };