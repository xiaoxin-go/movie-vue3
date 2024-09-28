import React, {useEffect, useState} from "react";
import {Image} from "../FilmDetail.types";
import styles from "../FilmDetail.module.css";
import {Dialog, DialogContent, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export const Images: React.FC<{images: Image[]}> = ({images}) =>{
    const [open, setOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const handleImageClick = (index: number) => {
        setCurrentImageIndex(index);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleNext = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrevious = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };
    return <div className={styles.images}>
        {
            images?.map((image, i) => {
                const imagePath = require(`f:/static/images/big/${image.name}.jpg`)
                return (
                    <div key={i} className={styles.imageItem}>
                        <img className={styles.img} src={imagePath} alt="" onClick={()=>handleImageClick(i)}/>
                    </div>
                )
            })
        }
        {
            images && <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth PaperProps={{
                style: { backgroundColor: 'transparent', boxShadow: 'none' },
            }}>
                <DialogContent style={{position: 'relative', backgroundColor: 'transparent'}}>
                    <IconButton
                        style={{position: 'absolute', top: 0, right: 0, color: "#fff"}}
                        onClick={handleClose}
                    >
                        <CloseIcon/>
                    </IconButton>
                    <img src={require(`f:/static/images/big/${images[currentImageIndex].name}.jpg`)}
                         alt={`Large view ${currentImageIndex + 1}`}
                         style={{height: "100%", cursor: 'pointer'}}
                    />
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: 0,
                        right: 0,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0 20px'
                    }}>
                        <button onClick={handlePrevious} style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '2rem',
                            color: 'white',
                            opacity: 0.7,
                            transition: 'opacity 0.2s',
                        }}>
                            ❮
                        </button>
                        <button onClick={handleNext} style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '2rem',
                            color: 'white',
                            opacity: 0.7,
                            transition: 'opacity 0.2s',
                        }}>
                            ❯
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        }
    </div>
}