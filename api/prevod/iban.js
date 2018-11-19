const express = require('express');
const router = express.Router();
const leftPad = require('left-pad');

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'Handling GET request to /iban'
    });
});

router.post('/',(req,res,next)=>{
    const iban ={
        acc: req.body.acc,
        code: req.body.code
    };

    function Modulo(bban)
    {
        var k = 0;
        for(var i = 0; i < bban.length;i++){
            k = ((k* 10) + parseInt(bban.charAt(i), 10)) % 97;

        }
        return k;
    }

    function IbanString(iban)
        {
            var cisloUctu = (leftPad((iban.acc),10, '0'));
            var banka = iban.code;
            var prefix = "000000";
            var SK = "282000";
            var checksum = banka + prefix + cisloUctu + SK;
            var checksumFinal = (98 - Modulo(checksum));
            return "SK".concat(checksumFinal, " ",
                " ",iban.code," ","0000 00"," ",cisloUctu);
        }

        function BankaString(iban)
        {
            var kodBanky = [ "5200","0200","0900","0720","1100","1111","3000","3100","5900",
            "6500","7300","7500","7930","8050","8100","8120","8130","8160","8170","8180","8300",
            "8320","8330","8360","8370","8410"];
            var nazovBanky = [ "OTP Banka Slovensko, a.s.", "Všeobecná úverová banka, a.s.",
            "Slovenská sporiteľňa, a.s.","Národná banka Slovenska","Tatra Banka,a.s.",
                "UniCredit Bank Slovakia,a.s.","Slovenská záručná a rozvojová banka, a.s.",
            "VOLKSBANK Slovensko, a.s.","Prvá stavebná sporiteľňa, a.s.","Poštová banka, a.s.",
            "ING Bank N.V., pobočka zahraničnej banky","Československá obchodná banka, a.s.",
            "Wüstenrot stavebná sporiteľňa, a.s.","COMMERZBANK Aktiengesellschaft, pobočka zahraničnej banky, Bratislava,",
            "Komerční banka Bratislava, a.s.","Privatbanka, a.s.,","Citibank Europe plc, pobočka zahraničnej banky",
            "EXIMBANKA SR","ČSOB stavebná sporiteľňa, a. s.","Štátna pokladnica","HSBC Bank plc, pobočka zahraničnej banky",
            "J&T BANKA, a.s., pobočka zahraničnej banky","Fio banka, a.s. pobočka zahraničnej banky",
            "mBank S.A, pobočka zahraničnej banky","Oberbank AG pobočka zahraničnej banky v Slovenskej republike",
            "ZUNO BANK AG, pobočka zahraničnej banky"];

            for(var i =0; i < kodBanky.length; i++)
            {
                if (kodBanky[i]===(iban.code))
                    return nazovBanky[i];
            }
            return null;
        }

    res.status(201).json({
        Iban: IbanString(iban), 
        Banka: BankaString(iban)
    });
});


module.exports = router;