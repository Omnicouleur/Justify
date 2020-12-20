const assert = require('assert');
const justifyContent = require('../services/justifyContent.service');
describe('Text Justification test', () => {
    it('one paragraph', () => {
        let text= "Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n’avais pas le temps de me dire: «Je m’endors.»";
        let paragraphs = text.split("\n");
        let justifiedText = justifyContent(paragraphs,80);
        let expectedResult = "Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte,\n" +
            "mes  yeux  se  fermaient  si  vite  que  je n’avais pas le temps de me dire: «Je\n" +
            "m’endors.»                                                                      ";
        assert.strictEqual(justifiedText, expectedResult);
    });

    it('multi paragraph', () => {
        let text = "Cette croyance survivait pendant quelques secondes à mon réveil; elle ne choquait pas ma raison, mais pesait comme des écailles sur mes yeux et les empêchait de se rendre compte que le bougeoir n’était plus allumé.\n Cette croyance survivait pendant quelques secondes à mon réveil; elle ne choquait pas ma raison, mais pesait comme des écailles sur mes yeux et les empêchait de se rendre compte que le bougeoir n’était plus allumé.";
        let paragraphs = text.split("\n");
        let justifiedText = justifyContent(paragraphs,80);
        let expectedResult = "Cette  croyance  survivait  pendant  quelques  secondes  à  mon  réveil; elle ne"+
        "\n"+ "choquait  pas  ma  raison,  mais  pesait  comme des écailles sur mes yeux et les"
        +"\n"+"empêchait de se rendre compte que le bougeoir n’était plus allumé.              "
        +"\n"+"Cette  croyance  survivait  pendant  quelques  secondes  à  mon  réveil; elle ne"
        +"\n"+"choquait  pas  ma  raison,  mais  pesait  comme des écailles sur mes yeux et les"
        +"\n"+"empêchait de se rendre compte que le bougeoir n’était plus allumé.              ";
        assert.strictEqual(justifiedText, expectedResult);
    });

    it('last line', () => {
        let text= "suivent encore dans le silence de la nuit, à la douceur prochaine du retour.";
        let paragraphs = text.split("\n");
        let justifiedText = justifyContent(paragraphs,80);
        let expectedResult = "suivent encore dans le silence de la nuit, à la douceur prochaine du retour.    ";
        assert.strictEqual(justifiedText, expectedResult);
    });
});
