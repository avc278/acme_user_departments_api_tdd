const Sequelize = require('sequelize');
const { UUID, UUIDV4, STRING } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_users_db', { logging: false });

const User = conn.define('user', {
    id: {
        primaryKey: true,
        type: UUID,
        defaultValue: UUIDV4
    },
    name: {
        type: STRING,
        unique: true,
        allowNull: false,
        allowEmpty: false
    },
});

const Department = conn.define('department', {
    id: {
        primaryKey: true,
        type: UUID,
        defaultValue: UUIDV4
    },
    name: {
        type: STRING,
        unique: true,
        allowNull: false,
        allowEmpty: false
    },
});

User.belongsTo(Department);

const syncAndSeed = async() => {
    await conn.sync({ force: true });
    
    const [ fooDepartment, barDepartment ] = await Promise.all([
        Department.create({ name: 'Foo Department' }),
        Department.create({ name: 'Bar Department' }),
    ]);
    const [andres, dan, prof] = await Promise.all([
        User.create({ name: 'Andres', departmentId: fooDepartment.id }),
        User.create({ name: 'Dan', departmentId: fooDepartment.id }),
        User.create({ name: 'Prof', departmentId: barDepartment.id })
    ]);

    const users = await User.findAll();

    return {
        users
    };
};

module.exports = {
    syncAndSeed,
    models: {
        User,
        Department
    }
};
