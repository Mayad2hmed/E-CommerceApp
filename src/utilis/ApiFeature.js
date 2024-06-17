export default class ApiFeature{
    constructor(mongooseQuery,queryString){
        this.mongooseQuery=mongooseQuery;
        this.queryString=queryString
    }
    pagination(){
        let page=this.queryString*1||1
        if(this.queryString<=0)page=1
        let skip=(page-1)*4
        this.page=page
        this.mongooseQuery.skip(skip).limit(4)
        return this
    }
    filter(){
        let filetObj={...this.queryString}
        let execludedQuery=["page","sort","feilds","keyword"]
        execludedQuery.forEach((q)=>{
              delete filetObj[q]
        })
        filetObj=JSON.stringify(filetObj)
        filetObj=filetObj.replace(/\bgt|gte|lt|lte\b/g,(match)=>`$${match}`)
        filetObj=JSON0.parse(filetObj)
        this.mongooseQuery.find(filetObj)
        return this

    }
    sort(){
        if(this.queryString.sort){
         let sortBy=this.queryString.sort.split(",").join(" ")
         this.mongooseQuery.sort(sortBy)
         return this

        }
    }
    search(){
        if(this.queryString.keyword){
            this.mongooseQuery.find({
                $or:[{title:{$regex:req.query.keyword,$options:"i"}},{description:{$regex:req.query.keyword,$options:"i"}}]
            })
        }
        return this
    }
    fields(){
        if(this.queryString.fields){
            let fields=this.queryString.fields.split(",").join(" ")
            this.mongooseQuery.select(fields)
        }
        return this
    }

}