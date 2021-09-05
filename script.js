/*Убрать label при scroll*/
function hideLabel (element, label) {
    document.querySelector(element).addEventListener('scroll', function () {
        if (document.querySelector(element).scrollTop > 10) {
            document.querySelector(label).style.visibility = 'hidden'
        } else {
            document.querySelector(label).style.visibility = 'visible'
        }
    })
}

hideLabel('.all_words__area', '.all_words__area + label')
hideLabel('.dictionary_words__area', '.dictionary_words__area + label')
hideLabel('.plain_text__input', '.plain_text__input + label')



/*---*/

document.querySelector('.open_plainText__button').addEventListener('click', function () {
    plainText = document.querySelector('.file').files[0];
    plainTextReader = new FileReader();
    plainTextReader.readAsText(plainText);

    plainTextReader.onload = function () {
        document.querySelector('.plain_text__input').value = plainTextReader.result
    }
    plainTextReader.onerror = function () {
        console.log(plainTextReader.error)
    }
})

document.querySelector('.choose_words__button').addEventListener('click', function () {
    document.querySelector('.all_words__area').value = plainTextReader.result.replace(/[.,%]/g, '').split(' ').join('\n');
    document.querySelector('.word_number').innerHTML = `Слов в тексте: ${plainTextReader.result.split(' ').length}`;
})

document.querySelector('.open_dictionary__button').addEventListener('click', function () {
    dictionary = document.querySelector('.dictionary').files[0];
    dictionaryReader = new FileReader();
    dictionaryReader.readAsText(dictionary);

    dictionaryReader.onload = function () {
        dictionaryWords = dictionaryReader.result.split(' ')
        document.querySelector('.dictionary_words__area').value = dictionaryReader.result.replace(/[.,%]/g, '').split(' ').join('\n');
    }
})

document.querySelector('.analyze__button').addEventListener('click', function () {
    let allWords = document.querySelector('.all_words__area').value.split('\n');
    let dictWords = document.querySelector('.dictionary_words__area').value.split('\n');
    analyzeModal = document.querySelector('.modal-body')

    let res = [];

    if (allWords[0] === '') {
        analyzeModal.innerHTML = 'Не выбран текст для анализа, либо не выбраны слова!'
    } else if (dictWords[0] === '') {
        analyzeModal.innerHTML = 'Нету слов для сравнения, добавьте словарь!'
    } else {
        for (let i of allWords) {
            if (dictWords.includes(i)) {
                res.push(i)
            }
        }

        analyze()
    }

    function analyze() {
        let percent = Math.round(res.length * 100 / allWords.length)

        if (percent >= 0 && percent < 5) {
            analyzeModal.innerHTML = `Слов с повышенным уровнем опасности - ${percent}%, - текст безопасный, маловажный!`
        } else if (percent > 5 && percent < 15) {
            analyzeModal.innerHTML = `Слов с повышенным уровнем опасности - ${percent}%, - текст средней важности!`
        } else if (percent > 15 && percent < 30) {
            analyzeModal.innerHTML = `Слов с повышенным уровнем опасности - ${percent}%, - текст важный!`
        } else if (percent > 30 && percent <= 100) {
            analyzeModal.innerHTML = `Слов с повышенным уровнем опасности - ${percent}%, - текст очень важный, большое количество конфиденциальных данных!`
        }
    }
})