
let Publi = [
  {
    id: 1,
    title: 'Cien Años de Soledad',
    description: 'La obra narra la historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo. La novela combina lo fantástico con lo real maravilloso y lo épico para representar la historia de América Latina y Colombia. La novela es considerada una obra maestra de la literatura en lengua española y una de las obras más traducidas y leídas en el mundo.',
    urlMedia: 'https://images-na.ssl-images-amazon.com/images/I/51Q5pFV1HPL._SX331_BO1,204,203,200_.jpg',
    idUser:1
  },
  {
    id: 2,
    title: 'El Amor en los Tiempos del Cólera',
    description: 'La novela narra la vida de Florentino Ariza y Fermina Daza, quienes se enamoran en su juventud, pero Fermina decide casarse con Juvenal Urbino. Florentino jura esperarla hasta que enviude. La historia transcurre en un ambiente de realismo mágico y es considerada una de las obras más importantes de la literatura hispanoamericana.',
    urlMedia: 'https://images-na.ssl-images-amazon.com/images/I/51y6qg0K2OL._SX331_BO1,204,203,200_.jpg',
    idUser:2
  },
  {
    id: 3,
    title: 'El Principito',
    description: 'El Principito narra la historia de un piloto que, mientras intenta reparar su avión averiado en medio del desierto del Sahara, se topa con un pequeño príncipe proveniente del asteroide B 612. Él le pide insistentemente que le dibuje un cordero y que nunca olvida una pregunta...',
    urlMedia: 'https://images-na.ssl-images-amazon.com/images/I/51y6qg0K2OL._SX331_BO1,204,203,200_.jpg',
    idUser:3
  }
];
let Users = [
  {
    id: 1,
    name: 'Juan',
    lastName: 'Pérez',
    userName: 'juanperez',
    email: 'asd@gmail.com',
    password : '1234',
    repassword: '1234',
    permission: 'admin'
  },
  {
    id: 2,
    name: 'Pedro',
    lastName: 'González',
    userName: 'pedrogomez',
    email: 'asdss@gmail.com',
  },
    {
    id: 3,
    name: 'Yuliana',
    lastName: 'Abreu',
    userName: 'yulianabreu',
    email: 'asdssd@gmail.com',
  }
]

let Comentarios = [];
let solicitudesAmistad = [
  {
    "userSend": 1,
    "userReq": 2,
    "estado": "aceptado",
    "id": 1
  }
];

// Exportamos los métodos que se comunicarán con la base de datos
exports.getPubli = () => {
  return Publi.map(publi => {
    const publiComentarios = Comentarios.filter(comentario => comentario.idPubli === publi.id);
    const user = Users.find(user => user.id === publi.idUser);
    return {
      ...publi,
      comentarios: publiComentarios,
      user: user ? { id: user.id, name: user.name, lastName: user.lastName, userName: user.userName } : null
    };
  });
};
exports.getPubliById = (id) => {
  const publi = Publi.find(pu => pu.id === parseInt(id));
  if (publi) {
    const publiComentarios = Comentarios.filter(comentario => comentario.idPubli === publi.id);
    return {
      ...publi,
      comentarios: publiComentarios
    };
  }
  return null;
};
exports.addPublicacion = (newData) => {
  const lastId = Publi.length > 0 ? Publi[Publi.length - 1].id : 0;
  newData.id = lastId + 1;
  Publi.push(newData);
};
exports.addComentarioPubli = (newData) => {
  const lastId = Comentarios.length > 0 ? Comentarios[Comentarios.length - 1].id : 0;
  newData.id = lastId + 1;
  Comentarios.push(newData);
}

exports.updatePublicacion = (id, newData) => {
  const index = Publi.findIndex(pub => pub.id === parseInt(id));
  Publi[index] = { ...Publi[index], ...newData };
}

exports.deletePubli = (id) => {
  Publi = Publi.filter(pub => pub.id !== parseInt(id));
}

// Exportamos los métodos Users
exports.getUsers = () => Users;

exports.getUserByEmail = (email) => Users.find(user => user.email === email);

exports.addUser = (newData) => {
  const lastId = Users.length > 0 ? Users[Users.length - 1].id : 0;
  newData.id = lastId + 1;
  newData.permission = 'normal';
  Users.push(newData);
}

exports.getUserByUserName = (userName) => Users.some(user => user.userName === userName);

exports.updateUser = (id, newData) => {
  const index = Users.findIndex(user => user.id === parseInt(id));
  Users[index] = { ...Users[index], ...newData };
}

exports.getUserById = (id) => Users.find(user => user.id === parseInt(id));

exports.deleteUser = (id) => {
  Users = Users.filter(user => user.id !== parseInt(id));
}


exports.createSolicitudAmi = (newData) => {
  const lastId = solicitudesAmistad.length > 0 ? solicitudesAmistad[solicitudesAmistad.length - 1].id : 0;
  newData.id = lastId + 1;
  solicitudesAmistad.push(newData);
  return solicitudesAmistad;
}

exports.findRelacion = (userSend, userReq) => solicitudesAmistad.find(solicitud => solicitud.userSend === userSend && solicitud.userReq === userReq) ?? null;

exports.updateSolicitudAmi = (id, newData) => {
  const index = solicitudesAmistad.findIndex(solicitud => solicitud.id === parseInt(id));
  solicitudesAmistad[index] = { ...solicitudesAmistad[index], ...newData };
}

exports.getUserPublicacionesById = (id) => {
  const publiUser = Publi.filter(publi => publi.idUser === parseInt(id));
  return publiUser;
}
exports.getFeedID = (id) => {
  const friends = solicitudesAmistad
    .filter(solicitud => (solicitud.userSend === parseInt(id) || solicitud.userReq === parseInt(id)) && solicitud.estado === 'aceptado')
    .map(solicitud => solicitud.userSend === parseInt(id) ? solicitud.userReq : solicitud.userSend);
  const latestPublications = friends.map(friendId => {
    const friendPublications = Publi.filter(publi => publi.idUser === friendId);
    return friendPublications.length > 0 ? friendPublications[friendPublications.length - 1] : null;
  }).filter(publi => publi !== null);

  return latestPublications;
}
exports.getFeed = (id) => {
  let latestPublications;

  if (id) {
    const friends = solicitudesAmistad
      .filter(solicitud => (solicitud.userSend === parseInt(id) || solicitud.userReq === parseInt(id)) && solicitud.estado === 'aceptado')
      .map(solicitud => solicitud.userSend === parseInt(id) ? solicitud.userReq : solicitud.userSend);
    latestPublications = friends.map(friendId => {
      const friendPublications = Publi.filter(publi => publi.idUser === friendId);
      return friendPublications.length > 0 ? friendPublications[friendPublications.length - 1] : null;
    }).filter(publi => publi !== null);
  } else {
    const users = Users.map(user => user.id);
    latestPublications = users.map(userId => {
      const userPublications = Publi.filter(publi => publi.idUser === userId);
      return userPublications.length > 0 ? userPublications[userPublications.length - 1] : null;
    }).filter(publi => publi !== null);
  }

  return latestPublications.map(publi => {
    const publiComentarios = Comentarios.filter(comentario => comentario.idPubli === publi.id);
    const user = Users.find(user => user.id === publi.idUser);
    return {
      ...publi,
      comentarios: publiComentarios,
      user: user ? { id: user.id, name: user.name, lastName: user.lastName, userName: user.userName } : null
    };
  });
}
exports.getSolicitudAmiById = (id) => solicitudesAmistad.find(solicitud => solicitud.id === parseInt(id));

exports.getSolicitudAmiByIdUserIdFriend = (idUser, idFriend) => solicitudesAmistad.find(solicitud => (solicitud.userSend === parseInt(idUser) && solicitud.userReq === parseInt(idFriend)));

exports.deleteSolicitudAmistad = (id) => {
  solicitudesAmistad = solicitudesAmistad.filter(solicitud => solicitud.id !== parseInt(id));
}


exports.getSolicitudesAmistad = () => solicitudesAmistad;


/* 
{
    "userSend": 1,
    "userReq": 2

}
 // solicitud de amistad


 {
    "name": "david",
    "lastName": "Pérez",
    "email": "assd@gmail.com",
    "userName": "davidp",
    "password": "1234",
    "repassword": "1234"
  }
    //agregando user

 */
 
