import React,{useState,useEffect} from 'react';
import todo from "../images/images.png";


 // to get the data from list
 const getLocalItems=()=>{
     
    let list=localStorage.getItem("lists");
     if(list){                                              //if list is not empty
         return JSON.parse(localStorage.getItem("lists")); //convert string into object/array
     } else{
         return [];
     }
   }

 const Todo=()=>{
 
    const[inputData, setInputData]= useState("");
    const[items,setItems]=useState(getLocalItems());     //bcoz it expects an array
    const[toggleSubmit,setToggleSubmit]=useState(true);
    const[isEditItem,setisEditItem]=useState(null);               //after editing changing icon
   
    const addItem=()=>{
 
        if(!inputData){
            alert("Please write something");
        }else if( inputData && !toggleSubmit){                 //if editing the data
            setItems(items.map((ele)=>{                         //to check the which id is editable
                   if(ele.id === isEditItem){
                       return {...ele,name:inputData}
                   }
                   return ele;
            }))
            setToggleSubmit(true);
            setInputData("");
            setisEditItem(null);
          
        }
        else{  //Creating a new key dynamically using getting time
             const allInputData={id:new Date().getTime().toString(),name:inputData} //key-Value pair
            setItems([...items,allInputData]);
            setInputData("");
        }
   }
//delete item 
const  deleteItem=(index)=>{
    const updateditems=items.filter((ele)=>{
            return index!== ele.id;
    });
    setItems(updateditems);
}


const  editItem=(id)=>{
let newEditItem=items.find((ele)=>{                 //which id is selected to edit
        return ele.id===id;
});
console.log(newEditItem);
  setToggleSubmit(false);
  setInputData(newEditItem.name);
  setisEditItem(id);

}

//remove All
const removeAll=()=>{
 setItems([]);
}
 //Add data to local storage                                     // setitem and getitem are predefined functions
 useEffect(() => {
        localStorage.setItem('lists',JSON.stringify(items));      //key value pair , we can give any key name
 }, [items]) ;                                                    //whenever the value of items changes


    return(
         <>
         <div className="main-div">
             <div className="child-div">
                 <figure>
                     <img src={todo} alt=" todologo"></img>
                      <figcaption> Add Your List Here 🤞</figcaption>
                 </figure>
                 <div className="addItems">
                     <input type="text"  placeholder="✍️ Add Items..." id="" 
                     value={inputData} onChange={(e)=>setInputData(e.target.value)}
                     />
                     {
                         toggleSubmit?<i className="fas fa-plus add-btn" title="Add Item"  onClick={addItem}></i>:
                         <i className="fas fa-edit add-btn" title="Edit Item" onClick={addItem}></i>
                     }
                 
                         </div>
                 <div className="showItems">
                     {
                         items.map((ele)=>{
                             return(
                                <div className="eachItem" key={ele.id}>
                                   <h3>{ele.name}</h3>
                                   <div className="todo-btn">
                                       <i className="fa fa-edit add-btn" title="Edit Item" 
                                       onClick={()=>editItem(ele.id)}></i>
                                       <i className="far fa-trash-alt add-btn" title="Delete Item" 
                                       onClick={()=>deleteItem(ele.id)}></i>
                                  </div>
                                </div>
                             );
                         })
                     }
                      
                 </div>
                 <div className="showItems">
                   <button className="btn effect04" data-sm-linl-text="Remove All"
                   onClick={removeAll} ><span>REMOVE ALL</span></button>
                 </div>
             </div>
         </div>
         </>
     );
 }
export default Todo;


