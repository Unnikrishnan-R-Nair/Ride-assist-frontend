import { Component } from '@angular/core';
import { RideService } from '../services/ride.service';

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { style } from '@angular/animations';



@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {

  customers:any

  constructor(private service:RideService) {

    this.service.isAuthenticated()
    
    this.ngOnInit()
    
    
  }

  ngOnInit() {
    this.service.getCustomers().subscribe(data=>this.customers=data)
  }

  handleDelete(id:any) {
    this.service.deleteCustomer(id).subscribe(data=>{
      // console.log(data);
      
      this.ngOnInit()
      
    })
  }

  

  generatePdf(id:any) {

    console.log(this.customers);
    
    console.log(id);
    
    let customerDetail = this.customers.find((cust:any)=>cust.id==id)

    console.log(customerDetail);
    
    let body = []
    let index = 0
    for(let work of customerDetail.works) {
      index++

      if (work) {
        body.push([index, work.title, work.description, work.amount])

      }

    } 
    body.unshift(['Sl no','Work', 'Description', 'Amount(Rs)'])
    
    let custName = customerDetail.name.toUpperCase()

    let vehNo = customerDetail.vehicle_no.toUpperCase()

    let email = customerDetail.email

    let phone = customerDetail.phone

    let running_km = customerDetail.running_km

    let work_total = customerDetail.work_total?customerDetail.work_total:0

    const doc = new jsPDF()

    autoTable(doc, {
      theme:'plain',
      margin: {top: 30},
      styles:{fontSize: 8, fontStyle:'normal'},
      head: [
      
        ['','', '', '', '', '', ''], 
        [`Cust Name:`, `${custName}`, '', '', '', '', ''],
        [`Email:`, `${email}`, '', '', '', '', ''],
        [`Phone:`, `${phone}`, '', '', '', '', ''],
        [`Vehicle no:`, `${vehNo}`, '', '', '', '', ''],
        [`Running Kms:`, `${running_km} Km`, '', '', '', '', ''],
        [``, '', '', '', '', '', ''],
      ],

      headStyles: {fontSize:8, fontStyle: 'normal', fillColor: [255, 255, 255], textColor:20},
      body: body,
      bodyStyles: {fontSize:8, fontStyle: 'normal', fillColor:[222,222,222], halign:'center'},
      foot:[
        
        ['', '', '', `Total : Rs. ${work_total}`],
        [``, '', '', '', '', '', ''],
        [`Advisor Sig: `, '', '', '', '', 'Cust Sig: ', ''],
        
      ],
        // [`Cust name : ${custName}`, '','', `Vehicle no: ${vehNo}`]],
      footStyles:{fontSize: 8, fillColor: [255, 255, 255], fontStyle:'normal', textColor: 20},
      
  
    })
        
    doc.text('Invoice', 100, 20)
    // doc.text(`Name : ${custName}`, 20, 30)
    // doc.text(`Email : ${email}`, 20, 40)
    // doc.text(`Phone : ${phone}`, 20, 50)
    // doc.text(`Vehicle no : ${vehNo}`, 20, 60)
    // doc.text(`Running Kms : ${running_km}`, 20, 70)

    doc.save('table.pdf')

  }

}
