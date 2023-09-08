from rest_framework import serializers
from .models import BlogData

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogData
        fields = "__all__"
        
class BlogCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogData
        fields = "__all__"
        
    def validate(self,data):
        title = data['title']
        if BlogData.objects.filter(title=title).exists():
            raise serializers.ValidationError("Blog already exists with this title")
        
        if len(data['description']) < 20:
            raise serializers.ValidationError("Description must be at least 20 characters long")
        
        if data['tag']:
            if len(data['tag']) < 2:
                raise serializers.ValidationError("Tag must be at least 2 characters long")
        if data['author']:
            if len(data['author']) < 2:
                raise serializers.ValidationError("Author must be at least 2 characters long")
            for i in data['author']:
                if i.isdigit():
                    raise serializers.ValidationError("Author must not contain any digit")
        
        return data