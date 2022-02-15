const fs = require('fs')
const path = require("path")
// 1. Спробуйте створити якийсь файл txt, прочитайте з нього дані і одразу,
//     дані які ви отримали запишіть їх в інший файл, в вас вийде невеликий callback hell, пізніше я вам покажу
// як можна це обійти, але поки зробіть так

// fs.writeFile(path.join(__dirname,'task1', 'file.txt'), 'Andryuxa Krasavchik', (e) => {
//     if (e) {
//         console.log(e);
//         throw e
//     }
//     fs.readFile(path.join(__dirname,'task1', 'file.txt'), ((err, data) => {
//         if (e) {
//             console.log(e);
//             throw e
//         }
//         fs.writeFile(path.join(__dirname,'task1', 'file1.txt'), data, (err1 => {
//             if (err) {
//                 console.log(err);
//                 throw err
//             }
//         }))
//     }))
// })

// 2. Створіть файл ( можете вручну ) заповніть його якимись даними
// Прочитайте його, скопіюйте всі дані з нього і
// перенесіть їх в нову папку та файл в ній,
//  старий файл видаліть після того як все завершиться. Також вийде callback hell

// fs.mkdir(path.join(__dirname, 'task2'), (err => {
//     if (err) {
//         console.log(err);
//         throw err
//     }
//     fs.writeFile(path.join(__dirname, 'task2', 'task2.txt'), 'Andryuxa Krasavchik', (err => {
//         if (err) {
//             console.log(err);
//             throw err
//         }
//         fs.readFile(path.join(__dirname, 'task2', 'task2.txt'), (err, data) => {
//             if (err) {
//                 console.log(err);
//                 throw err
//             }
//             fs.mkdir(path.join(__dirname, 'task2.1'), (err => {
//                 if (err) {
//                     console.log(err);
//                     throw err
//                 }
//                 fs.writeFile(path.join(__dirname, 'task2.1', 'task2.1.txt'), data, (err => {
//                     if (err) {
//                         console.log(err);
//                         throw err
//                     }
//                     fs.unlink(path.join(__dirname, 'task2', 'task2.txt'), (err => {
//                         if (err) {
//                             console.log(err);
//                             throw err
//                         }
//                     }))
//                 }))
//             }))
//         })
//     }))
// }))

// 3. Створіть папку (можете вручну) напишіть скріпт який створить в ній якись дані
// (можуть бути нові папки і файли(в файли запишіть якусь дату) )
// і напишіть функцію яка буде зчитувати папку і перевіряти
// якщо дані які в ній лежать - це файли тоді вам потрібно їх очистити,
// але не видаляти, якщо дані - це папки, вам потрібно їх перейменувати і додати до назви префікс _new


// fs.writeFile(path.join(__dirname, 'task3', 'files', 'task3.txt'), 'Andryuxa Krasavchuk', (err => {
//     if (err) {
//         console.log(err);
//         throw err
//     }
//     fs.readFile(path.join(__dirname, 'task3', 'files', 'task3.txt'), (err, data) => {
//         if (err) {
//             console.log(err);
//             throw err
//         }
//         console.log(data)
//     })
// }))

const reading = () => {
    fs.readdir(path.join(__dirname, 'task3', 'files'), (err, files) => {
        if (err) {
            console.log(err);
            throw err
        }
        for (const file of files) {
            fs.stat(path.join(__dirname, 'task3', 'files', file), (err, stats) => {
                if (err) {
                    console.log(err);
                    throw err
                }
                if (stats.isFile()) {
                    fs.truncate(path.join(__dirname, 'task3', 'files', file), err => {
                        if (err) {
                            console.log(err);
                            throw err
                        }
                    })
                    return
                }
                fs.rename(path.join(__dirname, 'task3', 'files', file), path.join(__dirname, 'task3,', 'files', `new_${file}`), err => {
                    if (err) {
                        console.log(err)
                        throw err
                    }
                })
            })
        }
    })
}
reading()