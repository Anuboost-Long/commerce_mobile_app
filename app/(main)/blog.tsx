import AppText from "@/components/common/app-text";
import SizedBox from "@/components/common/sized-box";
import useTheme from "@/core/theme/theme-context";
import useHeaderCalc from "@/hooks/useHeaderCalc";
import React from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms } from "react-native-size-matters";

type BlogPost = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
};

const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    category: "Style Guide",
    title: "10 Must-Have Items for Your Wardrobe This Season",
    excerpt: "Discover the essential pieces that every wardrobe needs to stay current, versatile, and effortlessly stylish all season long.",
    date: "May 12, 2026",
    readTime: "4 min read",
  },
  {
    id: "2",
    category: "Shopping Tips",
    title: "How to Find the Best Deals Without Compromising Quality",
    excerpt: "Smart shopping is about more than just price. Learn how to spot genuine value and avoid common traps when hunting for discounts.",
    date: "May 8, 2026",
    readTime: "3 min read",
  },
  {
    id: "3",
    category: "Lifestyle",
    title: "Sustainable Shopping: Making Eco-Friendly Choices",
    excerpt: "Small decisions add up. Here's how to build a more conscious shopping habit that is good for your wallet and the planet.",
    date: "Apr 30, 2026",
    readTime: "5 min read",
  },
  {
    id: "4",
    category: "Trends",
    title: "Top Color Palettes Dominating Fashion Right Now",
    excerpt: "From earthy neutrals to bold pops of colour, we break down the hues that are showing up everywhere this season.",
    date: "Apr 22, 2026",
    readTime: "3 min read",
  },
  {
    id: "5",
    category: "How-To",
    title: "A Beginner's Guide to Building a Capsule Wardrobe",
    excerpt: "A well-built capsule wardrobe removes decision fatigue and saves money long term. Here is how to start yours from scratch.",
    date: "Apr 15, 2026",
    readTime: "6 min read",
  },
  {
    id: "6",
    category: "News",
    title: "Exciting New Collections Arriving This Summer",
    excerpt: "Get a first look at the upcoming drops from our top brand partners, curated exclusively for our customers.",
    date: "Apr 5, 2026",
    readTime: "2 min read",
  },
];

function BlogCard({ item, colors }: { item: BlogPost; colors: any }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors.surface, borderColor: colors.border, opacity: pressed ? 0.85 : 1 },
      ]}
    >
      <View style={[styles.imagePlaceholder, { backgroundColor: colors.primaryOpacity }]}>
        <View style={[styles.categoryTag, { backgroundColor: colors.primary }]}>
          <AppText font="SemiBold" fontSize="SubText" style={{ color: colors.white }}>
            {item.category}
          </AppText>
        </View>
      </View>
      <View style={styles.cardBody}>
        <AppText font="Bold" fontSize="SubTitle" style={{ color: colors.textPrimary, lineHeight: ms(20) }} numLines={2}>
          {item.title}
        </AppText>
        <SizedBox height={6} />
        <AppText font="Normal" fontSize="SubTitle" style={{ color: colors.textSecondary, lineHeight: ms(20) }} numLines={2}>
          {item.excerpt}
        </AppText>
        <SizedBox height={10} />
        <View style={styles.meta}>
          <AppText font="Medium" fontSize="SubText" style={{ color: colors.textSecondary }}>
            {item.date}
          </AppText>
          <View style={[styles.metaDot, { backgroundColor: colors.border }]} />
          <AppText font="Medium" fontSize="SubText" style={{ color: colors.primary }}>
            {item.readTime}
          </AppText>
        </View>
      </View>
    </Pressable>
  );
}

export default function Page() {
  const { colors } = useTheme();
  const { tab_header } = useHeaderCalc();
  const insets = useSafeAreaInsets();

  return (
    <FlatList
      data={BLOG_POSTS}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{
        paddingTop: tab_header + ms(12),
        paddingBottom: Math.max(insets.bottom, ms(24)),
        paddingHorizontal: ms(16),
        gap: ms(12),
      }}
      renderItem={({ item }) => <BlogCard item={item} colors={colors} />}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: ms(16),
    borderWidth: 1,
    overflow: "hidden",
  },
  imagePlaceholder: {
    height: ms(140),
    justifyContent: "flex-end",
    alignItems: "flex-start",
    padding: ms(12),
  },
  categoryTag: {
    paddingHorizontal: ms(10),
    paddingVertical: ms(4),
    borderRadius: ms(999),
  },
  cardBody: {
    padding: ms(14),
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(8),
  },
  metaDot: {
    width: ms(4),
    height: ms(4),
    borderRadius: ms(999),
  },
});
