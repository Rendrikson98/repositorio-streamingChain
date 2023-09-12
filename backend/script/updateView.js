const fetch = require("node-fetch");

const appointmentLog = (err, ok, numberRequisition) => {
    console.warn(`[${new Date()}] :\n -->`);
    console.log(`Erros: ${err}, ok: ${ok}, Número de requisições: ${numberRequisition}`);
};

const sendRequisition = async () => {
    const response =  await fetch("http://localhost:3000/updateInfoVideo/3", {
        method: "PATCH",
        body: JSON.stringify({assistedTime: 60}),
        headers: {'Content-Type': 'application/json'}
    });
    return response;
};

async function main(){

    let ok = 0;
    let error = 0;
    const InitialHour = `Initial hour: ${new Date()}`;

    for(let i = 0; i < 10000; i++){
        setTimeout( async ()=>{
            const result = await sendRequisition();

            if(result.status === 200){
                ok += 1;
            }else{
                error += 1;
            }

            appointmentLog(error, ok, i);

            if(i === 9999){
                console.log(InitialHour);
                console.log("Finish hour" + new Date());
            }
        }, 5000 * i);
    }
}

main();