export function generateClassCode(projectName, className, properties) {
    const propertyList = properties.split('\n')
        .map(prop => prop.trim())
        .filter(prop => prop) // Filtrar líneas vacías
        .map(prop => {
            const [type, name] = prop.split(',').map(s => s.trim());
            if (!type || !name) return ''; // Validar que ambos valores existan
            return `    public ${type} ${name} { get; private set; }`;
        })
        .filter(prop => prop) // Filtrar propiedades mal formateadas
        .join('\n');

    return `using ${projectName}.Domain.${className}.Events;
using ${projectName}.Domain.${className}.Validators;
using ${projectName}.Domain.SeedWork;

namespace ${projectName}.Domain.${className}s;

public class ${className} : AuditableEntity<${className}Id>, IAggregateRoot
{
${propertyList}

    private ${className}() : base()
    {
    } // requerido por EF

    private ${className}(${className}Id id, ${propertiesForConstructor(properties)})
        : base(id)
    {
${constructorAssignments(properties)}
    }

    public static ${className} Create${className}(${propertiesForCreateMethod(properties)})
    {
        var ${className.toLowerCase()} = new ${className}(new ${className}Id(Guid.NewGuid()), ${parametersForCreateMethod(properties)});

        ${className}Validator.Validate${className}(${className.toLowerCase()});

        return ${className.toLowerCase()};
    }

    public static async Task Delete${className}(${className} ${className.toLowerCase()}ToDelete, I${className}Repository ${className.toLowerCase()}Repository)
    {
        ${className.toLowerCase()}Repository.Remove(${className.toLowerCase()}ToDelete);
    }
}`;
}

function propertiesForConstructor(properties) {
    return properties.split('\n')
        .map(prop => prop.trim())
        .filter(prop => prop) // Filtrar líneas vacías
        .map(prop => {
            const [type, name] = prop.split(',').map(s => s.trim());
            if (!type || !name) return ''; // Validar que ambos valores existan
            return `${type} ${name.toLowerCase()}`;
        })
        .filter(prop => prop) // Filtrar propiedades mal formateadas
        .join(', ');
}

function constructorAssignments(properties) {
    return properties.split('\n')
        .map(prop => prop.trim())
        .filter(prop => prop) // Filtrar líneas vacías
        .map(prop => {
            const [, name] = prop.split(',').map(s => s.trim());
            if (!name) return ''; // Validar que el nombre exista
            return `        ${name} = ${name.toLowerCase()};`;
        })
        .filter(prop => prop) // Filtrar propiedades mal formateadas
        .join('\n');
}

function propertiesForCreateMethod(properties) {
    return properties.split('\n')
        .map(prop => prop.trim())
        .filter(prop => prop) // Filtrar líneas vacías
        .map(prop => {
            const [type, name] = prop.split(',').map(s => s.trim());
            if (!type || !name) return ''; // Validar que ambos valores existan
            return `${type} ${name.toLowerCase()}`;
        })
        .filter(prop => prop) // Filtrar propiedades mal formateadas
        .join(', ');
}

function parametersForCreateMethod(properties) {
    return properties.split('\n')
        .map(prop => prop.trim())
        .filter(prop => prop) // Filtrar líneas vacías
        .map(prop => {
            const [, name] = prop.split(',').map(s => s.trim());
            if (!name) return ''; // Validar que el nombre exista
            return `${name.toLowerCase()}`;
        })
        .filter(prop => prop) // Filtrar propiedades mal formateadas
        .join(', ');
}
