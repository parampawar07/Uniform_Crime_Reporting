jQuery.sap.declare("content.Formatter");

 content.Formatter = {

        info : function(oV1, oV2, oV3, oV4,oV5,oV6,oV7,oV8,oV9,oV10,oV11) {
            var str = jQuery('<div class="marker-info-win">'  +
                '<div class="marker-inner-win"><span class="info-content">' +
                '<h1 class="marker-heading">' + oV1 + '</h1>' + '<p>' + '(Average over 51 years)' + '</p>' +
                '' + '<b>' + 'PROPERTY CRIME : ' + oV2 + '<br>' + '<br>' + '<b>' +'Burglary :' +oV3 + '<br>' + '<b>' +'Motor Vehicle Theft :' +oV4 + 
                '<br>' + '<b>' +'Larcency Theft :' +oV5 + '<br>' + '<br>' + '<br>'+ '<br>' + '<b>' +'VIOLENT CRIME :'  +oV6   + '<br>' + '<br>' + '<b>' +'Aggravated Assault :'  +oV7  + 
                '<br>' + '<b>' +'Murder & Nonnegligent Manslaughter :' +oV8 + '<br>' + '<b>' +'Legacy Rape :' +oV9 + '<br>' + '<b>' +'Revised Rape :' +oV10 +
                '<br>' + '<b>' +'Robbery :' +oV11 +
                '</span></div></div>');
            return str[0].outerHTML;
        }
        
};