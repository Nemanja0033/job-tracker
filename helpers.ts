export function getTextColor(status: string){
    let textColor = '';

    switch(status){
        case "APPLIED":
            textColor = 'text-black';
            break;
        case "REJECTED":
            textColor = "text-red-500";
            break;
        case "INTERVIEW":
            textColor = "text-green-500"
            break;
    };  

    return textColor;
}