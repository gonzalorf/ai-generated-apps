export function generateValidatorCode(projectName, className) {
    return `using ${projectName}.Domain.${className}s.Exceptions;
using FluentValidation;

namespace ${projectName}.Domain.${className}s.Validators;
internal class ${className}Validator : AbstractValidator<${className}> 
{
    public ${className}Validator() 
    {
        // Example:
        //_ = RuleFor(c => c.Nombre).NotEmpty().MinimumLength(2).MaximumLength(64);  
    }

    public static void Validate${className}(${className} ${className.toLowerCase()}) 
    {
        var validator = new ${className}Validator();
        var validationResult = validator.Validate(${className.toLowerCase()});

        if (!validationResult.IsValid)
        {
            throw new ${className}InvalidException(validationResult.ToString());
        }
    }
}`;
}
