# Déploiement sur Heroku

Pré-requis : 
+ Avoir créer un compte Git et un compte heroku et avoir installer sur sa machine heroku toolbelt ( le CLI )
+ Avoir un script start dans package.json et écouter le port process.env.PORT dans app.listen   

Dans un terminal tapez :
+ heroku --help pour vérifier si l'installe s'est bien passée
+ heroku login : taper adresse mail inscription et mot de passe

Je suis maintenant connecter à mon compte heroku 

## Création d'une clé SSH

heroku keys:add

je peux désormais communiquer en ssh avec heroku ( à faire pour chaque orodi )

## Se connecter

+ ssh -v git@heroku.com
+ Répondre yes au warning

## Créer dossier heroku pour mon app et le mettre en ligne

Une fois que mon git est à jour :

+ heroku create : depuis le dossier de mon app ceci créera une remote depuis mon git et l'app heroku avec un nom aléatoire 
+ git push heroku : push sur ma toute nouvelle branche heroku c-à-d en ligne!!!

Si mon app doit évoluer, dès que git est à jour je fais un nouveau git push heroku

## Aller sur mon app

Solution 1 : copier l'adresse de mon app qui est désormais présente dans le terminal et la coller dans un navigateur web ( chrome ou autre )

solution 2 : heroku open



