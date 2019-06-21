var User = require('./models/User');
const bcrypt = require('bcryptjs');

//const password = "admin123";

const adminUser = async () => {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash("password", salt);

    var user = {
        name: "Admin User",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "admin"
    };

    User.create(user, function(e) {
            if (e) {
                throw e;
            }
        });

    
};

adminUser();



// User.create(adminUser(), function(e) {
//     if (e) {
//         throw e;
//     }
// });