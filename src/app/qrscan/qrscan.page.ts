import { Component,ViewChild, ElementRef, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import jsQR from 'jsqr';
@Component({
  selector: 'app-qrscan',
  templateUrl: './qrscan.page.html',
  styleUrls: ['./qrscan.page.scss'],
})
export class QrscanPage implements OnInit {
  //qr
  scanActive = false;
  scanResult = null;
  ticektValue :any;
  loading: HTMLIonLoadingElement;
  videoElement: any;
  canvasElement: any;
  canvasContext: any;
  scanedTicket: Boolean = false;
  //alert variables
  showAlert: boolean = false;
  Alert_Text = "";
  Alert_Status = "";
  Alert_Color = "";
  @ViewChild('video', {static: false}) video: ElementRef;
  @ViewChild('canvas', {static: false}) canvas: ElementRef;
  @ViewChild('fileinput', {static: false}) fileinput: ElementRef;
  @ViewChild('paymentnnput', {static: false}) paymentInput: ElementRef;
  constructor(private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.showAlert = false;
  }
  ngAfterViewInit(){
    this.videoElement = this.video.nativeElement;
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
  }

  captureImage(){
    this.fileinput.nativeElement.click();
  }
  UploadPayment(){
   
    this.fileinput.nativeElement.click();
    console.log(this.fileinput)
  }

  handleFile(event): void{
    this.showAlert = false;
    try{
      const files = event.target.files;
    const file = files.item(0);
    var img = new Image();
    img.onload = () => {
      this.canvasContext.drawImage(img, 0, 0, this.canvasElement.width, this.canvasElement.height);
      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      console.log(imageData)
      const code = jsQR(imageData.data, imageData.width, imageData.height,{
        inversionAttempts: 'dontInvert'
      });
      if(code){
        this.scanResult = code.data;
        this.ticektValue =  this.scanResult.split(':')[1].replace('}','')
        this.scanedTicket = true; 
      }
      if(this.scanedTicket){
        this.Alert_Text = "The Ticket has been scaned successfully.";
        this.Alert_Status = "Success ! ";
        this.Alert_Color = "alertSuccess";//green color
        this.showAlert = true;
      }
      else if(!this.scanedTicket){ 
        this.Alert_Text = "An error has ocurred when trying read the QR, please try again.";
        this.Alert_Status = "Fail ! ";
        this.Alert_Color = "alertError";//red color
        this.showAlert = true;
      }
    };
    img.src = URL.createObjectURL(file);
    }catch{
      this.Alert_Text = "An error has ocurred when trying read the QR, please try again.";
      this.Alert_Status = "Fail ! ";
      this.Alert_Color = "alertError";//red color
      this.showAlert = true;
    }
  }
  
  async startScan(){
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode : 'environment'}
    });
    this.videoElement.srcObject = stream;
    this.videoElement.setAttribute('playsinLine', true);
    this.videoElement.play();

    this.loading = await this.loadingCtrl.create({});
    await this.loading.present();
    requestAnimationFrame(this.scan.bind(this));
  }

  async scan(){
    this.showAlert = false;
    let flag = true;
    console.log("SCAN");
    if(this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA){
      if(this.loading){
        await this.loading.dismiss();
        this.loading = null;
        this.scanActive = true;
      }
      this.canvasElement.height = this.videoElement.videoHeight;
      this.canvasElement.width = this.videoElement.videoWidth;

      this.canvasContext.drawImage(
        this.videoElement, 
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );

      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );

      const code = jsQR(imageData.data, imageData.width, imageData.height,{
        inversionAttempts: 'dontInvert'
      });
      console.log('code:', code);
      if(code){
        console.log("StopScan");
        this.scanResult = code.data;
        this.ticektValue =  this.scanResult.split(':')[1].replace('}','')
        this.scanedTicket = true; 

        this.videoElement.srcObject;
        this.videoElement.srcObject.getVideoTracks()[0].stop();
        this.scanActive = false;
        flag = false;
      }else{
        if(this.scanActive){
          requestAnimationFrame(this.scan.bind(this));
        }
      } 
      //show alert
      if(this.scanedTicket){
        this.Alert_Text = "The Ticket has been scaned successfully.";
        this.Alert_Status = "Success ! ";
        this.Alert_Color = "alertSuccess";//green color
        this.showAlert = true;
      }
      else if(!this.scanedTicket){ 
        this.Alert_Text = "An error has ocurred when trying read the QR, please try again.";
        this.Alert_Status = "Fail ! ";
        this.Alert_Color = "alertError";//red color
        this.showAlert = true;
      }
    }else{
      requestAnimationFrame(this.scan.bind(this));
    }
  }

  reset(){
    this.showAlert = false;
    this.scanResult = null;
    this.ticektValue = "";
  }
}
