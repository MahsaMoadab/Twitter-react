import React, { useRef, useState } from "react";
import { Grid, Tooltip } from "@material-ui/core";
import Typography from '@mui/material/Typography';
import { uploadUserPhoto } from "../../../api/api_auth";
import { toast } from "react-toastify";

import styles from '../../../styles/Sidebar.module.css';

export default function Profile() {
    const [imgFile, setImgFile] = useState();
    const [imgPath, setImgPath] = useState();
    const fileRef = useRef();

    const handelAvatarChange = (e) => {
        const fileTarget = e.target.files;
        if (fileTarget && fileTarget.length > 0) {
            setImgFile(fileTarget[0]);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImgPath(e.target.result)
            };

            reader.readAsDataURL(fileTarget[0])

            const fomData = new FormData();
            fomData.append('image', e.target.files[0])
            uploadUserPhoto(fomData, (isOk, data) => {
                if (!isOk)
                    return toast.error(data)
                toast.success('پروفایل شما با موفقیت تغییر کرد.')
                localStorage.setItem('image', data.imgPath);
            })
        }
    }

    const openUploadFile = () => {
        fileRef.current.click();
    }

    const getImage = () => {
        const profile = localStorage.getItem('image')
        if (imgPath) {
            return imgPath
        }
        if (profile && profile !== "undefined") {
            return profile
        }
        else {
            return '/images/default-profile.svg'
        }
    }

    const LogOutUser = () => {
        localStorage.clear();
        window.location.reload()
    }


    return (
        <>
            <Grid container direction={"row-reverse"} className={styles.myProfiles}>
                <Tooltip title="خروج">
                    <img  onClick={LogOutUser} src={'/images/logout-icon.svg'} className={styles.logout} alt={"logout"} />
                </Tooltip>
                <div className={styles.backProfile}>
                    <img src={getImage()} alt={'userProfile'} className={styles.profileImg} />
                    <Tooltip title="بارگذاری پروفایل">
                        <img onClick={openUploadFile} src={'/images/upload-profile.svg'} alt={'uploadProfile'} className={styles.uploadProfile} />
                    </Tooltip>
                </div>
                <Grid item className={styles.proText}>
                    <Typography className={styles.userText}>
                        {localStorage.getItem('name')}
                    </Typography>
                    <Typography className={styles.usenameText}>
                        {localStorage.getItem('username')}
                    </Typography>
                </Grid>
            </Grid>
            <input
                type={'file'}
                style={{ display: 'none' }}
                accept={"image/*"}
                ref={fileRef}
                onChange={handelAvatarChange} />
        </>
    )
}