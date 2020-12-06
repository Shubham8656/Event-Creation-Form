import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import  './Form.css';
import {connect} from 'react-redux';
import {addToView} from '../Redux/Action';
import store from '../Redux/Store';

function Form(){

    let data =JSON.parse(localStorage.getItem('data'))
    // console.log('storage data',data)
    if(data===null){
        data={
            title:'',
            summary:'',
            register:'',
            link:'',
            file1:'',
            file2:'',
        }
    }

    function PreviewImage() {
        var oFReader = new FileReader();
        oFReader.readAsDataURL(document.getElementById("image").files[0]);
  
        oFReader.onload = function (oFREvent) {
          document.getElementById("uploadPreview").src = oFREvent.target.result;
        setfile1(oFREvent.target.result)
        };
      }
      
      function PreviewImage1() {
        var oFReader = new FileReader();
        oFReader.readAsDataURL(document.getElementById("fileupload").files[0]);
  
        oFReader.onload = function (oFREvent) {
          document.getElementById("uploadPreview1").src = oFREvent.target.result;
        setfile2(oFREvent.target.result)
        };
      }
    
    const [title,settitle] = useState(`${data.title}`);
    const [summary,setsummary] = useState(`${data.summary}`);
    const [register,setregister] = useState(`${data.register}`);
    const [link,setlink] = useState(`${data.link}`)
    const [show,setshow] = useState(false)
    const [file1,setfile1] = useState(data.file1)
    const [file2,setfile2] = useState(data.file2)
    
    const [eventerror,setevent] = useState('');
    const [titleerror,settitleerror] = useState('');
    const [catagerror,setcatagerror] = useState('');
    const [starterror,setstarterror] = useState('');
    const [enderror,setenderror] = useState('');
    const [stimeerror,setstimeerror] = useState('');
    const [etimeerror,setetimeerror] = useState('');
    const [summaryerror,setsummaryerror] = useState('');

    useEffect(()=>{
        if(title.length)
        {
            settitleerror('')
        }
        else{
            settitleerror('this field is mandatory')
        }

        if(summary.length)
        {
            setsummaryerror('')
        }
        else{
            setsummaryerror('This field is mandatory')
        }
    
    },[title.length,summary.length])
    

    function createHandler(){
        // checking event is selected or not
        let event = document.getElementById('selectevent').value;
        if(event!=='select...')
        {
            setevent('')
        }
        else{
            setevent('This field is mandatory')
        }

        let catagory = document.getElementById('selectcatag').value;
        if(catagory!=='select...')
        {
            setcatagerror('')
        }
        else{
            setcatagerror('This field is mandatory')
        }
        
        let start = document.getElementById('start').value;
        if(start!=='')
        {
            setstarterror('')
        }
        else{
            setstarterror('This field is mandatory')
        }
       
        let end = document.getElementById('end').value;
        if(end!=='')
        {
            setenderror('')
        }
        else{
            setenderror('This field is mandatory')
        }
       
        let starttime = document.getElementById('starttime').value;
        if(starttime!=='')
        {
            setstimeerror('')
        }
        else{
            setstimeerror('This field is mandatory')
        }
        
        let endtime = document.getElementById('endtime').value;
        if(endtime!=='')
        {
            setetimeerror('')
        }
        else{
            setetimeerror('This field is mandatory')
        }
        
        let tz = document.getElementById('timezone').value

        if(event!=='select...' && title.length  && catagory!=='select...' && summary.length && start.length && end.length && starttime.length && endtime.length)
        {
            alert('Redirecting to View Page for Confirmation')
            // console.log('view',event,'file',title,catagory,summary,register,link,'toggle',tz,start,end,starttime,endtime,attach)
            setshow(true)
            let data = {
                event:event,
                title:title,
                catagory:catagory,
                summary:summary,
                register:register,
                link:link,
                tz:tz,
                start:start,
                end:end,
                starttime:starttime,
                endtime:endtime,
                file1:file1,
                file2:file2,
            }
            localStorage.setItem('data',JSON.stringify(data))
            
            store.dispatch(addToView({
                event:event,
                title:title,
                catagory:catagory,
                link:link,
                tz:tz,
                summary:summary,
                register:register,
                start:start,
                end:end,
                starttime:starttime,
                endtime:endtime,
                file1:file1,
                file2:file2,
              
            }))

        }
        else{
            alert('Please fill all mandatory details')
            setshow(false)
        }
    }

    const cancelHandler=()=>{
        alert(' Event Cancelled')
        localStorage.removeItem('data')
        window.location.reload()
    }

    return(
        <div className='container'>
            <div className='header'>
                <div id='event'>
                    Create Event
                </div>
                <div className='buttons'>
                <button id='create' onClick={createHandler} type='submit'>Create</button>
                    <button id='cancel' onClick={cancelHandler}>Cancel</button>
                </div>
            </div> 

            <div className='form-container'>
                
                <p>Add Event in *</p>
                <select id='selectevent' defaultValue={data.event}>
                    <option>select...</option>
                    <option>Meeting</option>
                </select>
                <div style={{color:'red'}}>{eventerror}</div>
                
                <div className='horizontal'>
                <input type="file" id="image" accept="image" onChange={PreviewImage} />
                <img id='uploadPreview' src={file1} alt=''></img>
                </div>

                <p>Title *</p>
                <textarea id='titles' value={title} onChange={(e)=>settitle(e.target.value)}></textarea>
                <div id='letters'>({title.length}/250)</div>
                <div style={{color:'red'}}>{titleerror}</div>

                <p>Categories *</p>
                <select id='selectcatag' defaultValue={data.catagory} >
                    <option>select...</option>
                    <option>Formal</option>
                </select>
                <div style={{color:'red'}}>{catagerror}</div>

                <p>Short Summary *</p>
                <textarea  className='summary' value={summary} onChange={(e)=>setsummary(e.target.value)}></textarea>
                <div id='letters'>({summary.length}/500)</div>
                <div style={{color:'red'}}>{summaryerror}</div>

                <p>Title: Public</p>
                <input type='text'  className='register' placeholder='Registration Site' value={register} onChange={(e)=>setregister(e.target.value)}/>
                <div id='letters'>({register.length}/1024)</div>
                {/* <div style={{color:'red',fontSize:'90%'}}>{catagerror}</div> */}

                <p id='virtual-event'>Is this a Virtual event ? yes 
                <label className="switch">
                <input type="checkbox" id='checkbox'/>
                <span className="slider round"></span>
                </label></p>

                <input type='text' id='link' placeholder='Online Link' onChange={(e)=>setlink(e.target.value)}/>

                <p>Select Timezone *</p>
                <select id='timezone'  defaultValue={data.tz}>
                    <option> Pune   (GMT-12:00) </option>
                    <option> Mumbai   (GMT-12:00) </option>
                </select>

                <div className='datetime'>
                    <div>
                        <p>Start Date *</p>
                        <input type="date" id="start" name="start" defaultValue={data.start}/>
                        <div style={{color:'red'}}>{starterror}</div>
                    </div>

                    <div id='starttimes'>
                        <p>Start Time *</p>
                        <input type="time" id="starttime" name="appt" defaultValue={data.starttime}/>
                        <div style={{color:'red'}}>{stimeerror}</div>
                    </div>

                    <div id=''>
                        <p>End Date *</p>
                        <input type="date" id="end" name="start" defaultValue={data.end}/>
                        <div style={{color:'red'}}>{enderror}</div>
                    </div>

                    <div id='endtimes'>
                        <p>End Time *</p>
                        <input type="time" id="endtime" name="appt" defaultValue={data.endtime}/>
                        <div style={{color:'red'}}>{etimeerror}</div>
                    </div>

                </div>
                
                <p>Attachments </p>

                <div className='horizontal'>
                    <input type="file" id="fileupload" name="fileToUpload" accept="image"  onChange={PreviewImage1} />
                    <img id='uploadPreview1' src={file2} alt=''></img>
                </div>
                <p id='footer'> Use option on the top right section of the screen to save your changes</p>
            </div>
            {
                show?<Redirect to='/view'/>:null
            }     
        </div>
    );
}
const mapStateToProps=(state)=>{
    return{
        data:state.data
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
    addToView : (data)=>dispatch(addToView(data))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Form);