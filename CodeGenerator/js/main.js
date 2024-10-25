import { generateClassCode } from './generators/classGenerator.js';
import { generateValidatorCode } from './generators/validatorGenerator.js';

document.getElementById('class-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const projectName = document.getElementById('project-name').value;
    const className = document.getElementById('class-name').value;
    const properties = document.getElementById('properties').value;

    // Generar código de la clase y el validador
    const classCode = generateClassCode(projectName, className, properties);
    const validatorCode = generateValidatorCode(projectName, className);

    // Crear contenedor para los archivos generados
    createGeneratedFileContainer('Clase de Dominio', classCode, `${className}.cs`);
    createGeneratedFileContainer('Validador', validatorCode, `${className}Validator.cs`);

    // Guardar en LocalStorage
    localStorage.setItem(`${className}_code`, classCode);
    localStorage.setItem(`${className}_validator_code`, validatorCode);
});

function createGeneratedFileContainer(title, code, filename) {
    const fileContainer = document.createElement('div');
    fileContainer.classList.add('file-container');

    const fileTitle = document.createElement('h3');
    fileTitle.textContent = title;
    fileContainer.appendChild(fileTitle);

    const codeElement = document.createElement('pre');
    codeElement.textContent = code;
    fileContainer.appendChild(codeElement);

    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Descargar';
    downloadButton.addEventListener('click', function () {
        downloadFile(filename, code);
    });
    fileContainer.appendChild(downloadButton);

    document.getElementById('generated-files-container').appendChild(fileContainer);
}

function downloadFile(filename, text) {
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element); 
    element.click();
    document.body.removeChild(element);
}
