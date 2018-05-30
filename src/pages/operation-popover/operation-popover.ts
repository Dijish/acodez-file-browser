import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { File } from '@ionic-native/file';

/**
 * Generated class for the OperationPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-operation-popover',
  templateUrl: 'operation-popover.html',
})
export class OperationPopoverPage {

  item :any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,  private fileNavigator: File, private toastCtrl: ToastController) {
    this.item=this.navParams.get('item');;

    console.log("File From Popover : ",this.item);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OperationPopoverPage');
  }

  delete(){
    this.presentConfirm();
  }

  copy(){
    this.presentPrompt('copy');
  }

  move(){
    this.presentPrompt('move');
  }

  rename(){
    this.presentPromptRename();
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirm Your Action',
      message: 'Do you want to delete this file?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('File Path and Name : ',this.item.fullPath,this.item.name);
            var path: any=this.item.nativeURL;
            // if (null != path && path.length() > 0 )
            // {
            var endIndex = path.lastIndexOf("/");
            if (endIndex != -1)  
            {
              var newstr = path.substring(0, endIndex); // not forgot to put check if(endIndex != -1)
              console.log("After cuting location : ",newstr);
            }
            //}  
            

            this.fileNavigator.removeFile(newstr,this.item.name).then(()=>{
              console.log("File is removed ! ");
              this.presentToast("Selected File is removed !");
            }).catch(error=>{
              console.log("Error : ",error);
            })
          }
        }
      ]
    });
    alert.present();
  }

  presentPrompt(type) {
    var path: any=this.item.nativeURL;
    var endIndex = path.lastIndexOf("/");
    if (endIndex != -1)  
    {
      var newstr = path.substring(0, endIndex); // not forgot to put check if(endIndex != -1)
      console.log("After cuting location : ",newstr);
    }

    let alert = this.alertCtrl.create({
      title: 'Enter Location',
      inputs: [
        {
          name: 'location',
          placeholder: 'file path',
          value : newstr
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Proceed',
          handler: data => {
            if(type=='copy'){
              this.fileNavigator.copyFile(newstr, this.item.name, data.location, this.item.name).then(fileEntry=>{
                console.log("Copied to : ",fileEntry);
                this.presentToast("File is copied to "+fileEntry.fullPath);
              }).catch(error=>{
                console.log("Copy Error : ",error);
              })
            }else{
              if(type=='move'){
                this.fileNavigator.moveFile(newstr, this.item.name, data.location, this.item.name).then(fileEntry=>{
                  console.log("Moved to : ",fileEntry);
                  this.presentToast("File is Moved to "+fileEntry.fullPath);
                }).catch(error=>{
                  console.log("Move Error : ",error);
                })
              }
            }
          }
        }
      ]
    });
    alert.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  presentPromptRename() {
    var path: any=this.item.nativeURL;
    var endIndex = path.lastIndexOf("/");
    if (endIndex != -1)  
    {
      var newstr = path.substring(0, endIndex); // not forgot to put check if(endIndex != -1)
      console.log("After cuting location : ",newstr);
    }

    let alert = this.alertCtrl.create({
      title: 'Enter New Name',
      inputs: [
        {
          name: 'location',
          placeholder: 'Name',
          value : this.item.name
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Proceed',
          handler: data => {
            this.fileNavigator.moveFile(newstr, this.item.name, newstr, data.location).then(fileEntry=>{
              console.log("Copied to : ",fileEntry);
              this.presentToast("File is Renamed !");
            }).catch(error=>{
              console.log("Move Error : ",error);
            })
          }
        }
      ]
    });
    alert.present();
  }


}
