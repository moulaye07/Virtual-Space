import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDirectory } from '../actions/directory.actions';
import { createFile } from '../actions/file.actions';
import { UidContext } from '../components/AppContext';
import SignUpForm from '../components/Log/SignUpForm';
import { ContextParent } from '../Store';
import { ContextSearch } from '../StoreForSearch';


const Data = () => {
	const userData = useSelector((state) => state.userReducer);
	const [showFormDirectory, setShowFormDirectory] = useState(false);
	const [showFormFile, setShowFormFile] = useState(false);
	const [children, setChildren] = useState([]);
	const [childrenforTaille, setChildrenForTaille] = useState([]);
	const [pile, setPile] = useState([]);
	const [pileChemin, setPileChemin] = useState([]);
	const uid = useContext(UidContext);
    const [parent, setParent] = useState(uid);
    const [current, setCurrent] = useState("");
    const [currentData, setCurrentData] = useState();
    const [folderName, setFolderName] = useState("");
	const [fileName, setFileName] = useState("");
	const [contenu, setContenu] = useState("");
	const [isUpdated, setIsUpdated] = useState(false);
	const [directoryUpdate, setDirectoryUpdate] = useState(null);
	const [fileUpdate, setFileUpdate] = useState(null);
    const [fileContenuUpdate, setFileContenuUpdate] = useState(null);
    const [state, setState] = useContext(ContextParent);
	const dispatch = useDispatch();
    const [queryState, setQueryState] = useContext(ContextSearch);
	const files = useSelector((state) => state.fileReducer);
    const directories = useSelector((state) => state.directoryReducer);
	const [childrenByQuery, setChildrenByQuery] = useState([]);

	const [taille, setTaille] = useState(false);
	const [valeurtaille, setValeurTaille] = useState(null);
	
	useEffect(() => {
		const getChildren = async () => {
			try {
				const res = await axios.get(`${process.env.REACT_APP_API_URL}directory/${parent}`);
				setChildren(res.data);
			} catch (err) {
				console.log(err);
			}
		}
		getChildren();
	}, [parent]);

	
	useEffect(() => {
		setChildrenForTaille([])
		const getTaille = (current) => {
			const getChildrenTaille = async () => {
				try {
					const res = await axios.get(`${process.env.REACT_APP_API_URL}directory/`+current);
					res.data.map((e)=>{
						if (e.picture==="./img/file.png") {
							setChildrenForTaille((prev) => [...prev, e]);
						}else{
							getTaille(e._id)
						}
					})
					
				} catch (err) {
					console.log(err);
				}

			}
			getChildrenTaille();
		}
		getTaille(parent)
	}, [parent]);
	
	const tailleValue = () => {
		var tab = 0
		childrenforTaille.map((e)=>{
			tab+=e.contenu.length
		})
		return tab
	}

	useEffect(() => {
		if (currentData && currentData[0] && currentData[0].picture==="./img/file.png") {
			setValeurTaille(currentData[0].contenu.length)
		} else {
			setValeurTaille(tailleValue())
		}
	}, [tailleValue, currentData]);
	

	useEffect(() => {
		const currentElement = async () => {
			try {
				const res = await axios.get(`${process.env.REACT_APP_API_URL}directory/current/${current}`);
				setCurrentData(res.data);
			} catch (err) {
				console.log(err);
			}
		}
		currentElement();
	}, [parent,current, pile]);


	const empiler = (idOfParent, n) => {
		pile.push(idOfParent)
		pileChemin.push(n)
	}
	const depiler = () => {
		setCurrent(pile[pile.length-1])
		setParent(pile[pile.length-1])
		pile.pop();
		pileChemin.pop();
	}

	const cancelElement = () => {
        setFolderName('');
        setContenu('');
        setFileName('');
		if(showFormDirectory) setShowFormDirectory(!showFormDirectory)
		if(showFormFile) setShowFormFile(!showFormFile)
		
    }
	const handleDossier = async () => {
         const dossier = {
             "idOfUser": userData._id,
             "name": folderName,
			 "idOfParent": parent
         }
         await dispatch(createDirectory(dossier));  
    }

	const handleFichier = async () => {
        const fichier = {
            "idOfUser": userData._id,
            "name": fileName,
            "contenu": contenu,
			"idOfParent": parent
        }
         await dispatch(createFile(fichier));
         cancelElement();
    }

	const deleteElement = async () => {
		try {
			if (currentData[0].picture==="./img/directory.png") {
				await axios.delete(`${process.env.REACT_APP_API_URL}directory/${currentData[0]._id}`);
			} else {
				await axios.delete(`${process.env.REACT_APP_API_URL}file/${currentData[0]._id}`);
			}
		} catch (err) {
			console.log(err);
		}
	}

	const handleDirectoryUpdate = (e) => {
		e.preventDefault()
        if(directoryUpdate) {
			const data = {
				"name": directoryUpdate
			}
			axios.put(`${process.env.REACT_APP_API_URL}directory/${currentData[0]._id}`, data);
        }
        setIsUpdated(false);
		depiler()
    }

	const handleFileUpdate = (e) => {
		e.preventDefault()
        if(fileUpdate || fileContenuUpdate) {
            const data = {
                "name" : fileUpdate,
                "contenu" : fileContenuUpdate 
            }
			axios.put(`${process.env.REACT_APP_API_URL}file/${currentData[0]._id}`, data);
        }
        setIsUpdated(false);
		depiler()
    }

	useEffect(() => {
		if(queryState){
			const result = directories.filter(e=>e.name.includes(queryState));
        	const result1 = files.filter(e=>e.name.includes(queryState));
        	result1.map((e)=>{
            	result.push(e)
        	})
			setChildrenByQuery(result)
			setQueryState(null)
		}
	}, [queryState, directories, files, childrenByQuery, setQueryState]);


    return (
        <div class={userData.role === "admin" ? ("col-lg-6") : ("col-lg-12")}>
			
			<aside class="sidebar static">
				{state===true && <SignUpForm />}	
				<div class="widget stick-widget">
						<>
						<h4 class="widget-title">
							Mes données
						</h4>
						<div class="style-impro">
							<h6 style={{fontWeight:"bold"}}>
								chemin :
									{pileChemin && 
										pileChemin.map((element) => {
											return (
												<span> {element}/</span>
											)
										})
									}
							</h6>

						</div>
						<div class="style-impro1">
							<span onClick={()=>{
									setParent(uid)
									setPile([])
									setChildrenForTaille([])
									setPileChemin([])
									setCurrent("")
									setQueryState(null)
									setChildrenByQuery(null)
									setIsUpdated(false)
									setShowFormDirectory(false)
									setShowFormFile(false)
								}}>
								<img src='./img/icons/home.svg' title='home' alt='home' style={{height:'35px'}}/>
							</span>
							<span onClick={()=>{
									
									if (pile.length===0) {
										setParent(uid)
										setCurrent("")
										setPileChemin([])
										setPile([])
										setChildrenForTaille([])

									}
									if (pile.length>0) {
										depiler()
									}
									setTaille(!taille)
									setIsUpdated(false);
									setShowFormDirectory(false)
									setShowFormFile(false)
									}}>
								<img src='./img/icons/icons8-left-48.png' title='return' alt='return' style={{height:'35px', marginLeft:"5px"}}/>
							</span>
							<span onClick={() => {
								if(window.confirm(`Supprimer "${currentData[0].name}" ?`)) {
									deleteElement();
									depiler()
								}
								}} style={{float:'right', marginRight:"20px", marginLeft:"5px"}}>
								<img src='./img/icons/trash.svg' alt='delete' style={{height:'35px'}}/>
							</span>
							<span onClick={() => {setIsUpdated(!isUpdated)}} style={{float:'right', marginLeft:"10px"}}>
								<img src='./img/icons/edit.svg' alt='edit' style={{height:'35px'}}/>
							</span>
							<span onClick={() => {setShowFormDirectory(!showFormDirectory); setShowFormFile(false)}} style={{float:'right', marginLeft:"10px"}}>
								<img src='./img/icons/icons8-add-folder-48.png' title='new folder' alt='new folder' style={{height:'35px'}}/>
							</span>
							<span onClick={() => {setShowFormFile(!showFormFile); setShowFormDirectory(false)}} style={{float:'right'}}>
								<img src='./img/icons/icons8-new-copy-48.png' title='new file' alt='new file' style={{height:'35px'}}/>
							</span>
						</div>
						
					
						<ul class="followers scroll">
							<li style={{textAlign:'center'}}>taille : {valeurtaille && valeurtaille} octets</li>
							{showFormDirectory && 
									<div className="newpst-input">
									<form method="">
										<textarea style={{border:'solid'}}
											rows="1"
											placeholder="nom du dossier"
											name="name"
											id="name"
											onChange={(e) => setFolderName(e.target.value)}
											value={folderName} 
										/>
										<div className="attachments">
											<ul>
												<li>
													{folderName ? (
														<button className='cancel' onClick={cancelElement}>annuler</button>
													) : null}
													<button onClick={handleDossier} style={{marginLeft:"10px"}}>Créer</button>
												</li>
											</ul>
										</div>
									</form>
								</div>
							}
							{showFormFile && 
									 <div className="newpst-input">
									 <form method="">
										 <textarea style={{border:'solid'}}
											 rows="1"
											 placeholder="nom du fichier"
											 name="fileName"
											 id="fileName"
											 onChange={(e) => setFileName(e.target.value)}
											 value={fileName} 
										 />
										 <textarea style={{border:'solid'}}
											 rows="5" 
											 placeholder="contenu"
											 name="contenu"
											 id="contenu"
											 onChange={(e) => setContenu(e.target.value)}
											 value={contenu} 
										 />
										 <div className="attachments">
											 <ul>
												 <li>
													{fileName || contenu ? (
														<button className='cancel' onClick={cancelElement}>annuler</button>
													) : null}
													 <button onClick={handleFichier} style={{marginLeft:'10px'}}>Créer</button>
												 </li>
											 </ul>
										 </div>
									 </form>
								</div>
							}

							{isUpdated===true && currentData[0].picture==="./img/directory.png" &&
                                <div className='newpst-input'>
									<form>
										<label htmlFor='title'>nom du dossier</label>
										<textarea style={{border:'solid'}}
											defaultValue={currentData[0].name}
											onChange={(e) =>setDirectoryUpdate(e.target.value)}
											id='title'
										/>
										<div className='attachments'>
											<button onClick={handleDirectoryUpdate}>
												appliquer
											</button> 
										</div>
									</form>
                                </div>
                            }

							{isUpdated===true && currentData[0].picture==="./img/file.png" &&
                                <div className='newpst-input'>
									<form>
										<label htmlFor='fileName'>nom du fichier</label>
										<textarea style={{border:'solid'}}
											defaultValue={currentData[0].name}
											onChange={(e) =>setFileUpdate(e.target.value)}
											id='fileName'
										/><br/>
										<br/>
										<label htmlFor='fileContent'>contenu</label>
										<textarea style={{border:'solid'}}
											rows="6"
											defaultValue={currentData[0].contenu}
											onChange={(e) =>setFileContenuUpdate(e.target.value)}
											id='fileContent'
										/>
										<div className='attachments'>
											<button onClick={handleFileUpdate}>
												appliquer
											</button>
										</div>

									</form>
                                </div>
                            }

							{childrenByQuery && childrenByQuery[0] ? (
								childrenByQuery.map((c) => {
									return (
										<>
										<li key={c._id}>
											<figure>
												<img src={c.picture} alt="" onClick={()=>{
													setParent(c._id);
													setCurrent(c._id);
													empiler(c.idOfParent, c.name);
												}}/>
											</figure>
											<div class="people-name">
												<span>{c.name}</span>
												{c.picture==="./img/file.png" && <p>{c.contenu.length + " octets"}</p>}
											</div>
										</li>
										</>
									)
								})

							):(
								children.map((c) => {
								return (
									<>
									<li key={c._id}>
										<figure>
											<img src={c.picture} alt="" onClick={()=>{
												setParent(c._id);
												setCurrent(c._id);
												empiler(c.idOfParent, c.name);
												setChildrenForTaille([])
												setTaille(!taille)
												if (c.picture==="./img/file.png") {
													setIsUpdated(!isUpdated)
												}
											}}/>
										</figure>
										<div class="people-name">
											<span>{c.name}</span>
										</div>
                                    </li>
									</>
								)
							})
							)}

							{children && currentData && currentData[0] && !currentData[0].contenu && children[0]===undefined  &&
								<>
								<p style={{textAlign: 'center'}}>dossier vide</p>
								</>
							}
						</ul>
						
						</>
					
				</div>									
			</aside>
		</div>
    );
};

export default Data;
