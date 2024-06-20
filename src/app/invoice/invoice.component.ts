import { Component } from '@angular/core';
import { RideService } from '../services/ride.service';
import { ActivatedRoute, Router } from '@angular/router';

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {

  custId:any

  customer:any

  works:any

  constructor(private service:RideService, private router:ActivatedRoute) {

    this.service.isAuthenticated()

    this.custId = this.router.snapshot.params['id']

    this.service.retrieveCustomer(this.custId).subscribe(data=>this.customer=data)


  }

  generatePdf() {

    const doc = new jsPDF()


    autoTable(doc, { 
      html: '#my_table1',
      useCss:true
    })
    autoTable(doc, { html: '#my_table2', useCss:true})
    autoTable(doc, { html: '#my_table3', useCss:true})
    
  
    doc.save('table.pdf')

  }

}



