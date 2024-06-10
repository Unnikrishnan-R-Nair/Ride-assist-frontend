import { Component } from '@angular/core';
import { RideService } from '../services/ride.service';

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'



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
      body.push([index, work.title, work.description, work.amount])

    } 
    
    let custName = customerDetail.name.toUpperCase()

    let vehNo = customerDetail.vehicle_no.toUpperCase()
    const doc = new jsPDF()

    autoTable(doc, {
      head: [['Sl no','Title', 'Description', 'Amount']],
      body: body,
      foot:[
        ['', '', '', `Total : Rs. ${customerDetail.work_total}`],
        [`Cust name : ${custName}`, '','', `Vehicle no: ${vehNo}`]],
      footStyles:{fontSize: 8, fillColor: [200, 200, 200, ], fontStyle:'normal', textColor: 20}
  
    })

    doc.save('table.pdf')

  }

}
