class CommonHelpers {

    applyRegexFromString(regex, text){

        if(!regex || !text){
            return;
        }

        return text.replace(regex, '');
    }

    validateUrl(url){        
        return /^([a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+.*)$/.test(url);        
    }
}

export default new CommonHelpers();
