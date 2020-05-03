const express = require('express')
const router = express.Router()
const Article = require('../models/article')


router.get('/new', (req, res) => {
    res.render('./../views/articles/new', {article: new Article() })
})
router.get('/:slug', async (req, res)=>{
    const article = await Article.findOne({slug:req.params.slug})
    
    if (article == null) 
    {
        res.redirect('/')
    }
    
    res.render('articles/detail', {article: article})
})

router.get('/edit/:id', async (req, res)=>{
    let article = await Article.findById(req.params.id)
    if(article){
        res.render('articles/edit', {article:article})
    }
    else{
        res.redirect('/')
    }
})

router.post('/', async (req, res) => {
    const article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
    })
    try{
        console.log(article.slug)
        await article.save()
        res.redirect('/')
    }
    catch(err){
        console.log(err)
        res.render('articles/edit', {article: article})
    }
})
router.put('/:id', async (req, res)=>{

    article = await Article.findById(req.params.id)
    article.title = req.body.title
    article.description = req.body.description
    article.markdown = req.body.markdown
    article = await article.save()
    res.redirect('/')
})
router.delete('/:id', async (req, res)=>{
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

module.exports = router