const assert = require('assert');
const justifyContent = require('../services/justify-content.service');
describe('Text Justification test', () => {
    it('one paragraph', () => {
        const text= "Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n’avais pas le temps de me dire: «Je m’endors.»";
        const paragraphs = text.split("\n");
        const justifiedText = justifyContent(paragraphs,80);
        const expectedResult = "Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte,\n" +
            "mes  yeux  se  fermaient  si  vite  que  je n’avais pas le temps de me dire: «Je\n" +
            "m’endors.»                                                                      ";
        assert.strictEqual(justifiedText, expectedResult);
    });

    it('multi paragraph', () => {
        const text = "Cette croyance survivait pendant quelques secondes à mon réveil; elle ne choquait pas ma raison, mais pesait comme des écailles sur mes yeux et les empêchait de se rendre compte que le bougeoir n’était plus allumé.\n Cette croyance survivait pendant quelques secondes à mon réveil; elle ne choquait pas ma raison, mais pesait comme des écailles sur mes yeux et les empêchait de se rendre compte que le bougeoir n’était plus allumé.";
        const paragraphs = text.split("\n");
        const justifiedText = justifyContent(paragraphs,80);
        const expectedResult = "Cette  croyance  survivait  pendant  quelques  secondes  à  mon  réveil; elle ne"+
        "\n"+ "choquait  pas  ma  raison,  mais  pesait  comme des écailles sur mes yeux et les"
        +"\n"+"empêchait de se rendre compte que le bougeoir n’était plus allumé.              "
        +"\n"+"Cette  croyance  survivait  pendant  quelques  secondes  à  mon  réveil; elle ne"
        +"\n"+"choquait  pas  ma  raison,  mais  pesait  comme des écailles sur mes yeux et les"
        +"\n"+"empêchait de se rendre compte que le bougeoir n’était plus allumé.              ";
        assert.strictEqual(justifiedText, expectedResult);
    });

    it('last line', () => {
        const text= "suivent encore dans le silence de la nuit, à la douceur prochaine du retour.";
        const paragraphs = text.split("\n");
        const justifiedText = justifyContent(paragraphs,80);
        const expectedResult = "suivent encore dans le silence de la nuit, à la douceur prochaine du retour.    ";
        assert.strictEqual(justifiedText, expectedResult);
    });
});
