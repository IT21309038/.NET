import React,{Component} from 'react'
import { variables } from './Variables'


export class StaffDash extends Component{

    constructor(props){
        super(props);

        this.state={
            staff:[],
            modalTitle: "",
            Userid: "",
            UserName: "",
            UserAddress: "",
            UserAge: 0,
            UserGender: "",
            UserPhoneNo: ""
        }
    }

    refreshList(){

        fetch(variables.API_URL+'User')
        .then(response=>response.json())
        .then(data=>{
            this.setState({staff:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    changeUserid = (e) => {
        this.setState({Userid:e.target.value});
    }

    changeUserName = (e) => {
        this.setState({UserName:e.target.value});
    }

    changeUserAddress = (e) => {
        this.setState({UserAddress:e.target.value});
    }

    changeUserAge = (e) => {
        this.setState({UserAge:e.target.value});
    }

    changeUserGender = (e) => {
        this.setState({UserGender:e.target.value});
    }

    changeUserPhoneNo = (e) => {
        this.setState({UserPhoneNo:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle: "Add User Data",
            Userid: "",
            UserName:"",
            UserAddress:"",
            UserAge:"",
            UserGender:"",
            UserPhoneNo:""

        })
    }

    editClick(st){
        this.setState({
            modalTitle: "Edit User Data",
            Userid: st.userid,
            UserName:st.userName,
            UserAddress:st.userAddress,
            UserAge:st.userAge,
            UserGender:st.userGender,
            UserPhoneNo:st.userPhoneNo

        })
    }

    createClick(){
        fetch(variables.API_URL+'User',{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Userid:this.state.Userid,
                UserName:this.state.UserName,
                UserAddress:this.state.UserAddress,
                UserAge:this.state.UserAge,
                UserGender:this.state.UserGender,
                UserPhoneNo:this.state.UserPhoneNo,
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(eror)=>{
            alert('Failed')
        })
    }

    updateClick(){
        fetch(variables.API_URL+'User',{
            method: 'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Userid:this.state.Userid,
                UserName:this.state.UserName,
                UserAddress:this.state.UserAddress,
                UserAge:this.state.UserAge,
                UserGender:this.state.UserGender,
                UserPhoneNo:this.state.UserPhoneNo,
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(eror)=>{
            alert('Failed')
        })
    }

    render(){
        const { staff,
                modalTitle,
                Userid,
                UserName,
                UserAddress,
                UserAge,
                UserGender,
                UserPhoneNo } = this.state;

        return(
            <div>
                <h3>This is Staff Dashboard</h3>

                <button type='button' className='btn btn-primary m-2 float-end'
                data-bs-toggle='modal' data-bs-target='#exampleModal'
                onClick={() => this.addClick()}>
                    Add User Data
                </button>

                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Userid</th>
                            <th>UserName</th>
                            <th>UserAddress</th>
                            <th>UserAge</th>
                            <th>UserGender</th>
                            <th>UserPhoneNo</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staff.map((st) => (
                            <tr key={st.userid}>
                                <td>{st.userid}</td>
                                <td>{st.userName}</td>
                                <td>{st.userAddress}</td>
                                <td>{st.userAge}</td>
                                <td>{st.userGender}</td>
                                <td>{st.userPhoneNo}</td>
                                <td>
                                    <button type="button" className="btn btn-light mr-1"
                                    data-bs-toggle='modal' data-bs-target='#exampleModal'
                                    onClick={() => this.editClick(st)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen-fill" viewBox="0 0 16 16">
                                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>

                <div className='modal fade' id='exampleModal' tabIndex="-1" aria-hidden="true">
                        <div className='modal-dialog modal-lg modal-dialog-centerd' >
                            <div className='modal-content'>
                                <div  className='model-header'>
                                    <h5 className='model-title'>{modalTitle}</h5>
                                    <button type='button' className='btn-close' data-bs-dismiss='model' aria-label='Close'></button>
                                </div>
                                <div className='modal-body'>
                                        <div className='input-group mb-3'>
                                        <span className='input-group-text'>User ID</span>
                                        <input type='text' className='form-control' value={Userid} onChange={this.changeUserid}></input>
                                        </div>

                                        <div className='input-group mb-3'>
                                        <span className='input-group-text'>User Name</span>
                                        <input type='text' className='form-control' value={UserName} onChange={this.changeUserName}></input>
                                        </div>

                                        <div className='input-group mb-3'>
                                        <span className='input-group-text'>User Address</span>
                                        <input type='text' className='form-control' value={UserAddress} onChange={this.changeUserAddress}></input>
                                        </div>

                                        <div className='input-group mb-3'>
                                        <span className='input-group-text'>User Age</span>
                                        <input type='number' className='form-control' value={UserAge} onChange={this.changeUserAge}></input>
                                        </div>

                                        <div className='input-group mb-3'>
                                        <span className='input-group-text'>User Gender</span>
                                        <div className="form-check">
                                            <input
                                            type='radio'
                                            className='form-check-input'
                                            name='gender'
                                            value='Male'
                                            checked={UserGender === 'Male'}
                                            onChange={this.changeUserGender}
                                            />
                                            <label className='form-check-label'>Male</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                            type='radio'
                                            className='form-check-input'
                                            name='gender'
                                            value='Female'
                                            checked={UserGender === 'Female'}
                                            onChange={this.changeUserGender}
                                            />
                                            <label className='form-check-label'>Female</label>
                                        </div>
                                        </div>


                                        <div className='input-group mb-3'>
                                        <span className='input-group-text'>User Phone No</span>
                                        <input type='text' className='form-control' value={UserPhoneNo} onChange={this.changeUserPhoneNo}></input>
                                        </div>

                                        <div className='input-group mb-3'>
                                            {modalTitle === 'Add User Data' && (
                                                <button type="button" className="btn btn-primary float-start" onClick={() => this.createClick()}>
                                                Add Details
                                                </button>
                                            )}

                                            {modalTitle === 'Edit User Data' && (
                                                <button type="button" className="btn btn-primary float-start" onClick={() => this.updateClick()}>
                                                Update Details
                                                </button>
                                            )}
                                            </div>

                                </div>
                            </div>
                        </div>
                </div>
                
            </div>
        )
    }
}