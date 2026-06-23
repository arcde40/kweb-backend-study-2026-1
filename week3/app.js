const express = require('express');

const app = express();

app.use(express.urlencoded({extended: true}));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/math',(req,res)=>{
	const error = req.query.error;
	res.render('math.pug',{sum : null,diff: null,error: error});
})

app.post('/calculate',(req,res)=>{
	const num1 = req.body.num1;
	const num2 = req.body.num2;
	if(isNaN(num1) || isNaN(num2)){
		return res.render('math.pug',{sum:null,diff:null,error:"올바른 숫자를 입력해주세요."})
	}
	const sum = Number(num1) + Number(num2);
	const diff = Number(num1) - Number(num2);
	res.render('math.pug',{sum: sum,diff: diff,error: null});

})

app.listen(8080,()=>{
	console.log("Port 8080")
})
