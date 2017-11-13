const register = async (ctx, next) => {
	await ctx.render('./frontend/sign', {
		title: '注册'
	});
}

const registerHandle = async (ctx, next) => {
	
}

export default { 
	register,
	registerHandle
}; 