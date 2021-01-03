const graphql = require('graphql');
const axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList
} = graphql;

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({  // defined but executed after the function call new GraphQLObjectType is done
        id: { type: GraphQLString},
        name: { type: GraphQLString},
        description: { type: GraphQLString},
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
                .then(res => res.data);
            }
        }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({ // defined but executed after the function call new GraphQLObjectType is done
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        company: {
            type: CompanyType,
            resolve(parentValue, args) {
                //console.log("++++", parentValue, args);
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
                  .then(res => res.data);
            }
        } 
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/users/${args.id}`)
                 .then(resp => resp.data);                
            }
        },
        company: {
            type: CompanyType,
            args: { id: { type: GraphQLString} },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/${args.id}`)
                  .then(resp => resp.data);
            }
        }
    }
});
 
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,  // return type from resolver
            args: {
                firstName: { type: GraphQLString },
                age: { type: GraphQLInt },
                companyId: { type: GraphQLString }
            },
            resolve() {

            }
        }
    }
});
module.exports = new graphql.GraphQLSchema({
    query: RootQuery
})