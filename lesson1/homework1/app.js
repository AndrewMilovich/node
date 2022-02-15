const fs = require('fs')
const path = require("path")

const arrOnline = [{name: "Andrii", age: 22, city: "Lviv"}, {name: 'Vova', age: 19, city: 'Kalush'}]
const arrInPerson = [{name: "Viktor", age: 58, city: "Odessa"}, {name: 'Vova', age: 19, city: 'Kalush'}]

// fs.mkdir(path.join(__dirname, 'lesson1', 'homework1', 'main', 'online'), (e) => {
//     if (e) {
//         console.log(e);
//         throw e
//     }
// })
// fs.mkdir(path.join(__dirname, 'lesson1', 'homework1', 'main', 'inPerson'), (e) => {
//     if (e) {
//         console.log(e);
//         throw e
//     }
// })


//     fs.writeFile(path.join(__dirname,'lesson1', 'homework1', 'main', 'online','file.txt'),'',(e)=>{
//         if (e) {
//             console.log(e);
//             throw e
//         }
//     })
// fs.writeFile(path.join(__dirname,'lesson1', 'homework1', 'main', 'inPerson','file2.txt'),'',(e)=>{
//     if (e) {
//         console.log(e);
//         throw e
//     }
// })
//
// for (let arrOnlineElement of arrOnline) {
//     for (const arrOnlineElementKey in arrOnlineElement) {
//         fs.appendFileSync(path.join(__dirname, 'lesson1', 'homework1', 'main', 'online', 'file2.txt'), `${arrOnlineElementKey}:${arrOnlineElement[arrOnlineElementKey]}\n`, (e) => {
//             if (e) {
//                 console.log(e);
//                 throw e
//             }
//         })
//     }}

// for (let arrOnlineElement of arrInPerson) {
//     for (const key in arrOnlineElement) {
//         fs.appendFileSync(path.join(__dirname, 'lesson1', 'homework1', 'main', 'inPerson', 'file1.txt'), `${key}:${arrOnlineElement[key]}\n`, (e) => {
//             if (e) {
//                 console.log(e);
//                 throw e
//             }
//         })
//     }}

// fs.rename(path.join(__dirname, 'lesson1', 'homework1', 'main', 'inPerson', 'file1.txt'),
//     path.join(__dirname, 'lesson1', 'homework1', 'main', 'online', 'file2.txt'),
//     (e)=>{
//         if (e) {
//                 console.log(e);
//                 throw e
//             }
// })

// Коли ви це виконаєте напишіть функцію яка буде міняти місцями юзерів з одного файлу і папки в іншу. (ті, що були в папці inPerson будуть в папці online)
const replace = () => {
    fs.readFile(path.join(__dirname, 'lesson1', 'homework1', 'main', 'inPerson', 'file1.txt'), (e, data1) => {
        if (e) {
            console.log(e);
            throw e
        }
        console.log(data1.toString());
        fs.readFile(path.join(__dirname, 'lesson1', 'homework1', 'main', 'online', 'file2.txt'), (e, data2) => {
            if (e) {
                console.log(e);
                throw e
            }
            console.log(data2.toString());
            fs.writeFile(path.join(__dirname, 'lesson1', 'homework1', 'main', 'online', 'file2.txt'), data1, e => {
                    if (e) {
                        console.log(e);
                        throw e
                    }
                }
            )
            fs.writeFile(path.join(__dirname, 'lesson1', 'homework1', 'main', 'inPerson', 'file1.txt'), data2, e => {
                    if (e) {
                        console.log(e);
                        throw e
                    }
                }
            )
        })
    })


}
replace()
