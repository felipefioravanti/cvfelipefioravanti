import React, { Component } from 'react';
import QrCode from 'react.qrcode.generator';

class Contact extends Component {

   constructor(props) {
      super(props);
      this.state = {
         contactName: '',
         contactEmail: '',
         contactTitle: '',
         contactMessage: '',
      };
   }

   handleContactName = (event) => {
      this.setState({
         contactName: event.target.value
      });
   };

   handleContactEmail = (event) => {
      this.setState({
         contactEmail: event.target.value
      });
   };

   handleContactTitle = (event) => {
      this.setState({
         contactTitle: event.target.value
      });
   };

   handleContactMessage = (event) => {
      this.setState({
         contactMessage: event.target.value
      });
   };

   handleSubmit = (event) => {
      event.preventDefault()
         fetch('http://localhost:3333/emailsmtp', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
             "contactName": this.state.contactName,
             "contactEmail": this.state.contactEmail,
             "contactTitle": this.state.contactTitle,
             "contactMessage": this.state.contactMessage
            })
           });

      document.getElementById("message-success").style.display="inline";
   };

  render() {
     const { contactName, contactEmail, contactTitle, contactMessage} = this.state

    if(this.props.data){
      var name = this.props.data.name;
      var street = this.props.data.address.street;
      var city = this.props.data.address.city;
      var state = this.props.data.address.state;
      var zip = this.props.data.address.zip;
      var phone= this.props.data.phone;
      var message = this.props.data.contactmessage;
      var wppMessage = this.props.data.contactwppmessage;
      var linkWhatsapp = this.props.data.linkwhatsapp;
    }

    return (
      <section id="contact">

         <div className="row section-head">

            <div className="two columns header-col">

               <h1><span>Entrar em Contato</span></h1>

            </div>

            <div className="ten columns">

                  <p className="lead">{message}</p>

            </div>

         </div>

         <div className="row">
            <div className="eight columns">
               <form onSubmit={this.handleSubmit} method="POST">
                  <div>
						   <label>Nome <span className="required">*</span></label>
						   <input type="text" value={contactName} size="35" onChange={this.handleContactName}/>
                  </div>

                  <div>
						   <label>Email <span className="required">*</span></label>
						   <input type="text" value={contactEmail} size="35" onChange={this.handleContactEmail}/>
                  </div>

                  <div>
						   <label>Título</label>
						   <input value={contactTitle} size="35" onChange={this.handleContactTitle}/>
                  </div>

                  <div>
                     <label>Mensagem <span className="required">*</span></label>
                     <textarea value={contactMessage} onChange={this.handleContactMessage} cols="50" rows="15"></textarea>
                  </div>

                  <div>
                     <button className="submit" type="submit">Enviar</button>
                     <span id="image-loader">
                        <img alt="" src="images/loader.gif" />
                     </span>
                  </div>
				   </form>

           <div id="message-warning"> Erro </div>
				   <div id="message-success">
                  <i className="fa fa-check"></i>Sua mensagem foi enviada, obrigado!<br />
				   </div>
           </div>

            <aside className="four columns footer-widgets">
               <div className="widget widget_contact">

					   <h4>Endereço e Telefone</h4>
					   <p className="address">
						   {name}<br />
						   {street} <br />
						   {city}, {state} {zip}<br />
						   <span>{phone}</span>
					   </p>
				   </div>

               <div className="widget widget_tweets">
                  <h4 className="widget-title">Ultimos Projetos do Git</h4>
                  <ul id="twitter">
                     <li>
                        <span>
                        O Happy é uma aplicação que conecta pessoas à casas de acolhimento institucional para fazer o dia de muitas crianças mais feliz.
                        </span>
                        <a href="#">https://github.com/felipefioravanti/nlw-03</a>
                        <br />
                        <b><a href="#">1 Dia Atrás</a></b>
                     </li>
                     <li>
                        <span>
                        Backend da aplicação Be-The-Hero, utilizando Node.js e banco SQLite.
                        </span>
                        <a href="#">https://github.com/felipefioravanti/omnistack11</a>
                        <br />
                        <b><a href="#">3 Days Ago</a></b>
                     </li>
                  </ul>
		         </div>
            </aside>
      </div>

      <div className="row section-head">

      <div className="two columns header-col">

         <h2><span>QR Code Whatsapp</span></h2>

      </div>

      <div className="ten columns">
            <br />
            <p className="lead">{wppMessage}</p>

      </div>

      </div>

      <div className="row section-head">
            <div className="download align-center">
               <p>
                  <a href={linkWhatsapp} className="button" download="" target="blank"> Enviar Mensagem </a>
               </p>
            </div>
            <div className="align-center">
               <QrCode value="https://api.whatsapp.com/send?phone=5511995658757&text=Agrade%C3%A7o%20o%20contato,%20irei%20te%20responder%20em%20at%C3%A9%20algumas%20horas%20=)"
                size="300"
                margin="5" />
            </div>
      </div>
   </section>
    ); 
  }
}

export default Contact;