import moment from 'moment';

export async function calculator(startDate, numberOfDays){
	try {
        const formatStartDate = moment(new Date(startDate)).format('YYYY-MM-DD');
        const workDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
        let count = 1;
        let totalCost = 0;
  
        while (numberOfDays >= count) {
            let day = moment(formatStartDate).add(count, 'd').format("ddd-DD").split("-");;
            if(workDays.includes(day[0])){
                let price = + await setPrice(day[1]);
                totalCost = (totalCost + price);
            };
            count++
        }

        return totalCost.toFixed(2);
	} catch(err){
		throw new Error(err);
	}
};

async function setPrice(day){
    let num = Number(day), price = 0.05;
    switch(true){
        case (num <= 7 ):
            return price.toFixed(2);
        case (num <= 14):
            return (price * 2).toFixed(2);
        case (num <= 21):
            return (price * 3).toFixed(2);
        case (num <= 28):
            return (price * 4).toFixed(2);
        case (num > 28):
            return (price * 5).toFixed(2);
    }
}
