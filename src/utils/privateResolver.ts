// protect/authorize resolver my wrapping it with middleware and check if user is exist, then proceed to resolver by using CURRY
// graphql is going to call first privateResolver in each resolver then graphql will call the same function again with 'resolverFunction' as argument, then this arg will be called by graphql with parent, args, context info arguments
const privateResolver = (resolverFunction) => async (
  parent,
  args,
  context,
  info
) => {
  if (!context.req.user) {
    throw new Error("No JWT or User in context, cannot proceed");
  }
  const resolved = await resolverFunction(parent, args, context, info);
  return resolved;
};

export default privateResolver;
