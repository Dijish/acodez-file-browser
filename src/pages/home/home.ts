import { Component } from '@angular/core';
import { NavController, Platform, LoadingController, NavParams, PopoverController, IonicPage } from 'ionic-angular';

import { File } from '@ionic-native/file';

import{OperationPopoverPage } from '../operation-popover/operation-popover';
import { enterView } from '@angular/core/src/render3/instructions';

import { SearchPipe } from '../../pipes/search/search';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items;
  noFile=true;
  savedParentNativeURLs = [];
  searchTerm;

  constructor(public navCtrl: NavController, private fileNavigator: File, public plt: Platform,  private loadingCtrl: LoadingController, private navParams:NavParams, public popoverCtrl: PopoverController) {
    const ROOT_DIRECTORY = 'file:///';
    plt.ready()
      .then(() => {
        this.listDir(this.fileNavigator.externalRootDirectory, '');
    })
    

  }
  handleError = (error) => {
    console.log('error reading,', error)
  };
  listDir = (path, dirName) => {
    this.fileNavigator.listDir(path, dirName)
      .then((entries) => {
        this.items = entries;
        if(entries.length!=0){
          this.noFile=false;
        }else{
          this.noFile=true;
        }
      })
      .catch(this.handleError);
  }
  goDown = (item) => {
    const parentNativeURL = item.nativeURL.replace(item.name, '');
    this.savedParentNativeURLs.push(parentNativeURL);

    this.listDir(parentNativeURL, item.name);
  }

  goUp = () => {
    const parentNativeURL = this.savedParentNativeURLs.pop();

    this.listDir(parentNativeURL, '');
  }

  fileOperation(myEvent,item){
    console.log("Items : ",item);
    var path=item.nativeURL;
    var endIndex = path.lastIndexOf("/");
    var newstr
    if (endIndex != -1)  
    {
      newstr = path.substring(0, endIndex); // not forgot to put check if(endIndex != -1)
      console.log("After cuting location : ",newstr);
    }
    let popover = this.popoverCtrl.create(OperationPopoverPage,{item : item});
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(data => {
      this.listDir(newstr, '');
    });
  }

  // this is run whenever the (ionInput) event is fired
  searchFn(ev: any) {
    this.searchTerm = ev.target.value;
  }

}
