const Tour = require('./../models/tourModel')

exports.getAllTours = async (req, res) => {
    console.log('enter int get all route');


    try {

        console.log(req.query);

        let query =  Tour.find({
           // rating: 3

        });


//        const tours = await Tour.find().where('rating').equals(3).where('price').gte(3000);

        //sort by price
        if(req.query.sort){
            query=query.sort(req.query.sort); 
        }

        //field     limiting
        
    //3) pagination
        //page=2  & limit 10

        query =query.skip(2).limit(1);



        const tours = await query;

        res.status(200).json({
            status: "success",
            result :tours.length,
            data: {
                tours
            }
        })
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: 'failed',
            message: err
        });
    };
}

exports.createTour = async (req, res) => {

    try {
        //const newTour =  new Tour({})
        //newTour.save()
        const newTour = await Tour.create(req.body);

        res.status(200).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });

    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: 'failed',
            message: err
        });
    }

};



exports.getTour = async (req,res)=>{
    try{

        const tour=await Tour.findById(req.params.id);
                        //Tour.findById({_id=req.params.id})
        console.log('enter into get route')
        res.status(200).json({
            status : "success",
            data:{
                tour
            }
        });
    }catch(err){
        console.log(err);
        res.status(404).json({
            status: 'failed',
            message: err
        });
    }
};


exports.updateTour = async (req,res)=>{
    try{

        const tour=await Tour.findByIdAndUpdate(req.params.id,req.body,{
            new : true,
            runValidators: true
        });
        console.log('Enter into updateTour ');

        res.status(200).json({
            status : "update successfully",
            data:{
                tour
            }
        });
    
    }catch(err){
        console.log(err);
        res.status(404).json({
            status: 'failed',
            message: err
        });
    }
};

exports.deleteTour = async (req,res)=>{

    try{
        await Tour.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status:"success",
            data:null
        });
    }catch(err){
        res.status(404).jsin({
            status: 'fail',
            message :err

        });
    }

};
