query{
greeting(name:"Suresh Kumar",
position: "Lead Software Engineer")
sum(frstNum:25, secNum:40)
me{
id
name
email
age
}
post{
id
title
body
published
}
grades
add(numbers:[1,5, 10,2])

users(query: "q"){
id
name
age
email
}
posts(pst:"Azure"){
id
title
body
published

}
}
--===================================
query{
GetPosts(pst: "Azure")
{
id
title
body
published
author{
id
name
email
age
}
}
GetUsers{
id
name
email
posts{
id
title
body
}

}
}
-===========================================
query{
GetPosts(pst: "Azure")
{
id
title
body
published
author{
id
name
email
age
}
}
GetUsers{
id
name
email
posts{
id
title
body
}
comments{
id
text
}
}
GetCommets{
id
text
author{
name
}
}
}

query{
GetPosts{
id
title
comments{
id
text
}
}
}

query{
GetCommets{
id
text
author{
name
}
post{
title
}
}
}
